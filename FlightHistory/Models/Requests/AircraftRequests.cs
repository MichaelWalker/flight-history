using System;
using System.ComponentModel.DataAnnotations;

namespace FlightHistory.Models.Requests
{
    public class CreateAircraftRequest
    {
        [Required]
        public string Registration { get; set; } = null!;
        public string? Model { get; set; }
        public DateTime? RolloutDate { get; set; }
        public DateTime? FirstFlightDate { get; set; }
        public int? Age { get; set; }
        public string? Status { get; set; }
        public string? EngineType { get; set; }
        public int? EngineCount { get; set; }
    }
}