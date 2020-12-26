using System;
using System.ComponentModel.DataAnnotations;

namespace FlightHistory.Models.Requests
{
    public class RecordFlightRequest
    {
        [Required]
        public string Aircraft { get; set; } = null!;
        
        [Required]
        public int Source { get; set; }

        [Required]
        public int Destination { get; set; }
        
        [Required]
        public DateTime DepartureDate { get; set; }
        
        [Required]
        public int Airline { get; set; }
    }
}