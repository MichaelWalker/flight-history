using System;
using System.Collections.Generic;
using System.Text.Json;
using RestSharp;

namespace DataImport
{
    class Program
    {
        class Aircraft
        {
            public string RegistrationNumber { get; set; }
            public string ProductionLine { get; set; }
            public string IataType { get; set; }
            public string ModelName { get; set; }
            public string ModelCode { get; set; }
            public string IcaoCodeHex { get; set; }
            public string IataCodeShort { get; set; }
            public string ConstructionNumber { get; set; }
            public string TestRegistrationNumber { get; set; }
            public string RolloutDate { get; set; }
            public string FirstFlightDate { get; set; }
            public string DeliveryDate { get; set; }
            public string RegistrationDate { get; set; }
            public string LineNumber { get; set; }
            public string PlaneSeries { get; set; }
            public string AirlineIataCode { get; set; }
            public string AirlineIacoCode { get; set; }
            public string PlaneOwner { get; set; }
            public string EnginesCount { get; set; }
            public string EnginesType { get; set; }
            public string PlaneAge { get; set; }
            public string PlaneStatus { get; set; }
            public string PlaneClass { get; set; }
        }

        class Response
        {
            public IEnumerable<Aircraft> Data { get; set; }
        }
        
        static void Main(string[] args)
        {
            var aircraft = new List<Aircraft>();
            var client = new RestClient("http://api.aviationstack.com/v1");
            var accessKey = System.Environment.GetEnvironmentVariable("AVIATIONSTACK_ACCESS_KEY");
            
            for (var i = 0; i <= 190; i++)
            {
                Console.WriteLine($"Page: {i + 1}");
                var offset = i * 100;
                var request = new RestRequest($"airplanes?access_key={accessKey}&offset={offset}");
                var response = client.Get<Response>(request);
                aircraft.AddRange(response.Data.Data);
            }

            Console.WriteLine($"Found {aircraft.Count} Results");
            var json = JsonSerializer.Serialize(aircraft, new JsonSerializerOptions {WriteIndented = true});
            System.IO.File.WriteAllText("aircraft.json", json);        
        }
    }
}