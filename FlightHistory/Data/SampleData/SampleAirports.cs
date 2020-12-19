using System.Collections.Generic;
using FlightHistory.Models.Db;

namespace FlightHistory.Data.SampleData
{
    public class SampleAirports
    {
        public static IEnumerable<Airport> Generate()
        {
            return new[]
            {
                new Airport
                (
                    "Heathrow"
                ),
                new Airport
                (
                    "Gatwick"
                ),
            };
        }
    }
}