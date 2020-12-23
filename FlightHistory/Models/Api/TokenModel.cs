namespace FlightHistory.Models.Api
{
    public readonly struct TokenModel
    {
        public TokenModel(string token)
        {
            Token = token;
        }

        public string Token { get; }
    }
}