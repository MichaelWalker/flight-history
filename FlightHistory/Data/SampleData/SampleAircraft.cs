using System.Collections.Generic;
using FlightHistory.Models.Db;

namespace FlightHistory.Data.SampleData
{
    public class SampleAircraft
    {
        public static IEnumerable<Aircraft> Generate()
        {
            return new[]
            {
                new Aircraft
                {
                    Registration = "G-AWBL"
                }
            };
        }
    }
}