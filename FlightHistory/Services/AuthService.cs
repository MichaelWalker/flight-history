using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using FlightHistory.Models.Db;
using Microsoft.AspNetCore.Identity;

namespace FlightHistory.Services
{
    public interface IAuthService
    {
        Task<User?> ValidateCredentials(string email, string password);
        Task<User> GetUserFromToken(string token);
    }
    
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly ITokenService _tokenService;

        public AuthService(UserManager<User> userManager, ITokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        public async Task<User?> ValidateCredentials(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
            {
                return null;
            }

            var verificationResult = _userManager.PasswordHasher.VerifyHashedPassword(user, user.PasswordHash, password); 
            return verificationResult == PasswordVerificationResult.Failed ? null : user;
        }

        public async Task<User> GetUserFromToken(string token)
        {
            var claimsPrincipal = _tokenService.ParseToken(token);
            var email = claimsPrincipal.Claims.Single(claim => claim.Type == ClaimTypes.Email).Value;
            return await _userManager.FindByEmailAsync(email);
        }
    }
}