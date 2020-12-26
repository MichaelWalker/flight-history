using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FlightHistory.Models.Db
{
    public class Flight
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string AircraftId { get; set; } = null!;
        public Aircraft Aircraft { get; set; } = null!;
        public int SourceId { get; set; }
        public Airport Source { get; set; } = null!;
        public int DestinationId { get; set; }
        public Airport Destination { get; set; } = null!;
        public DateTime DepartureDate { get; set; }
        public int AirlineId { get; set; }
        public Airline Airline { get; set; } = null!;
    }
}