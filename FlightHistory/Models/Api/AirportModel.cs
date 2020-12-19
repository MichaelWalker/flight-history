using FlightHistory.Models.Db;

namespace FlightHistory.Models.Api
{
    public class AirportModel
    {
        public string Name { get; }

        private AirportModel(string name)
        {
            Name = name;
        }

        public static AirportModel FromDbModel(Airport airport)
        {
            return new AirportModel(airport.Name);
        }
    }
}