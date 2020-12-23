using Microsoft.IdentityModel.Tokens;

namespace FlightHistory.Models
{
    public class JwtSettings
    {
        public JwtSettings(string issuer, string audience, SymmetricSecurityKey signingKey, int accessTokenExpiryMinutes, int refreshTokenExpiryMinutes)
        {
            Issuer = issuer;
            Audience = audience;
            SigningKey = signingKey;
            AccessTokenExpiryMinutes = accessTokenExpiryMinutes;
            RefreshTokenExpiryMinutes = refreshTokenExpiryMinutes;
        }

        public string Issuer { get; }
        public string Audience { get; }
        public SymmetricSecurityKey SigningKey { get; }
        public int AccessTokenExpiryMinutes { get; }
        public int RefreshTokenExpiryMinutes { get; }
    }
}