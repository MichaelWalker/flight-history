using FlightHistory.Models.Db;

namespace FlightHistory.Models.Api
{
    public readonly struct AirlineModel
    {
        public AirlineModel(string name)
        {
            Name = name;
        }

        public string Name { get; }

        public static AirlineModel FromDbModel(Airline airline)
        {
            return new AirlineModel(airline.Name);
        }
    }
}