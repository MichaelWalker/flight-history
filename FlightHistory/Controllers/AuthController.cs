using System;
using System.Linq;
using System.Threading.Tasks;
using FlightHistory.Models;
using FlightHistory.Models.Api;
using FlightHistory.Models.Requests;
using FlightHistory.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace FlightHistory.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private const string RefreshTokenCookie = "refresh-token"; 
        
        private readonly ILogger<AuthController> _logger;
        private readonly IAuthService _authService;
        private readonly ITokenService _tokenService;
        private readonly JwtSettings _jwtSettings;
        
        public AuthController(ILogger<AuthController> logger, IAuthService authService, ITokenService tokenService, JwtSettings jwtSettings)
        {
            _logger = logger;
            _authService = authService;
            _tokenService = tokenService;
            _jwtSettings = jwtSettings;
        }

        [HttpPost("sign-in")]
        public async Task<IActionResult> SignIn([FromBody] SignInRequest signInRequest)
        {
            _logger.LogDebug("Received Login Request");
            if (!ModelState.IsValid)
            {
                _logger.LogInformation("Rejecting sign in request - invalid request model");
                return BadRequest(ModelState.Values.SelectMany(v => v.Errors));
            }

            var user = await _authService.ValidateCredentials(signInRequest.Email!, signInRequest.Password!);

            if (user == null)
            {
                _logger.LogInformation("Rejecting sign in request - invalid credentials");
                return Unauthorized();
            }

            var accessToken = _tokenService.GenerateAccessToken(user);
            var refreshToken = _tokenService.GenerateRefreshToken(user);
            
            Response.Cookies.Append(RefreshTokenCookie, refreshToken, GetCookieOptions());
            
            _logger.LogInformation("Accepted Sign In Request");
            return Ok(new TokenModel(accessToken));
        }

        [HttpPost("sign-out")]
        public IActionResult SignOut()
        {
            Response.Cookies.Delete(RefreshTokenCookie);
            
            _logger.LogInformation("Signing Out User");
            return Ok();
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh()
        {
            var oldRefreshToken = Request.Cookies[RefreshTokenCookie];

            if (oldRefreshToken == null)
            {
                _logger.LogInformation("Invalid Refresh Request");
                return Unauthorized();
            }

            var user = await _authService.GetUserFromToken(oldRefreshToken);
            
            var accessToken = _tokenService.GenerateAccessToken(user);
            var newRefreshToken = _tokenService.GenerateRefreshToken(user);
            
            Response.Cookies.Append(RefreshTokenCookie, newRefreshToken, GetCookieOptions());
            
            _logger.LogInformation("Accepted Refresh Request");
            return Ok(new TokenModel(accessToken));
        }

        private CookieOptions GetCookieOptions()
        {
            return new CookieOptions
            {
                Path = Url.Action("Refresh"),
                Expires = DateTime.UtcNow.AddMinutes(_jwtSettings.RefreshTokenExpiryMinutes),
                Secure = true,
                HttpOnly = true,
                SameSite = SameSiteMode.Strict,
            };
        }
    }
}