using FlightHistory.Models.Db;

namespace FlightHistory.Models.Api
{
    public class AirportModel
    {
        public string Name { get; set; }

        public static AirportModel FromDbModel(Airport airport)
        {
            return new AirportModel
            {
                Name = airport.Name,
            };
        }
    }
}