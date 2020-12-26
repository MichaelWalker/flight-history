using System.Collections.Generic;
using FlightHistory.Models.Db;

namespace FlightHistory.Data.SampleData
{
    public class SampleFlights
    {
        public static IEnumerable<Flight> Generate()
        {
            return new[]
            {
                new Flight
                {
                    AircraftId = "G-AWBL",
                    SourceId = 1,
                    DestinationId = 2,
                    AirlineId = 1,
                }
            };
        }
    }
}