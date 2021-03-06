﻿using System;
using System.ComponentModel.DataAnnotations;

namespace FlightHistory.Models.Db
{
    public class Aircraft
    {
        [Key]
        public string Registration { get; set; } = null!;
        
        // TODO - this should really be its own table.
        public string? Model { get; set; }
        public DateTime? RolloutDate { get; set; }
        public DateTime? FirstFlightDate { get; set; }
        public int? Age { get; set; }
        public string? Status { get; set; }
        public string? EngineType { get; set; }
        public int? EngineCount { get; set; }
    }
}