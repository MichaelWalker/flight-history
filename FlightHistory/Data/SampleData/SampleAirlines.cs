using System.Collections.Generic;
using FlightHistory.Models.Db;

namespace FlightHistory.Data.SampleData
{
    public class SampleAirlines
    {
        public static IEnumerable<Airline> Generate()
        {
            return new[]
            {
                new Airline
                {
                    Name = "Cambrian"
                }
            };
        }
    }
}