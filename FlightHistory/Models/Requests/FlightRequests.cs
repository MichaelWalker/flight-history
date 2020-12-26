using System;
using System.ComponentModel.DataAnnotations;

namespace FlightHistory.Models.Requests
{
    public class RecordFlightRequest
    {
        [Required]
        public string AircraftRegistration { get; set; } = null!;
        
        [Required]
        [MaxLength(3)]
        [MinLength(3)]
        public string SourceIata { get; set; } = null!;
        
        [Required]
        [MaxLength(3)]
        [MinLength(3)]
        public string DestinationIata { get; set; } = null!;
        
        [Required]
        public DateTime DepartureDate { get; set; }
    }
}