using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using FlightHistory.Models;
using FlightHistory.Models.Db;
using Microsoft.IdentityModel.Tokens;

namespace FlightHistory.Services
{
    public interface ITokenService
    {
        string GenerateAccessToken(User user);
        string GenerateRefreshToken(User user);
        ClaimsPrincipal ParseToken(string token);
    }
    
    public class TokenService : ITokenService
    {
        private readonly JwtSecurityTokenHandler _tokenHandler;
        private readonly JwtSettings _settings;
        private readonly TokenValidationParameters _tokenValidationParameters;

        public TokenService(JwtSecurityTokenHandler tokenHandler, JwtSettings settings, TokenValidationParameters tokenValidationParameters)
        {
            _tokenHandler = tokenHandler;
            _settings = settings;
            _tokenValidationParameters = tokenValidationParameters;
        }
        
        public string GenerateAccessToken(User user)
        {
            return GenerateToken(user, _settings.AccessTokenExpiryMinutes);
        }

        public string GenerateRefreshToken(User user)
        {
            return GenerateToken(user, _settings.RefreshTokenExpiryMinutes );
        }

        public ClaimsPrincipal ParseToken(string token)
        {
            return _tokenHandler.ValidateToken(token, _tokenValidationParameters, out _);
        }

        private string GenerateToken(User user, int expiryMinutes)
        {
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new []
                {
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Name, user.Name),
                }),
                Expires = DateTime.UtcNow.AddMinutes(expiryMinutes),
                IssuedAt = DateTime.UtcNow,
                Issuer = _settings.Issuer,
                Audience = _settings.Audience,
                SigningCredentials = new SigningCredentials(_settings.SigningKey, SecurityAlgorithms.HmacSha512Signature),
            };
            
            var token = _tokenHandler.CreateToken(tokenDescriptor);
            return _tokenHandler.WriteToken(token);
        }
    }
}