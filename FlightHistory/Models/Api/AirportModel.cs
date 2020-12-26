using FlightHistory.Models.Db;

namespace FlightHistory.Models.Api
{
    public struct AirportModel
    {
        public string? Iata { get; }

        private AirportModel(string? iata)
        {
            Iata = iata;
        }

        public static AirportModel FromDbModel(Airport airport)
        {
            return new AirportModel(iata: airport.Iata);
        }
    }
}