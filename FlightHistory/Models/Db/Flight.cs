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

        public Aircraft Aircraft { get; set; } = null!;
        public Airport Source { get; set; } = null!;
        public Airport Desination { get; set; } = null!;
        public DateTime DepartureDate { get; set; }
    }
}