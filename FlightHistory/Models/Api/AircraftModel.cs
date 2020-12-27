using System;
using FlightHistory.Models.Db;

namespace FlightHistory.Models.Api
{
    public readonly struct AircraftModel
    {
        public AircraftModel(string registration, string? model, DateTime? rolloutDate, DateTime? firstFlightDate, int? age, string? status, string? engineType, int? engineCount)
        {
            Registration = registration;
            Model = model;
            RolloutDate = rolloutDate;
            FirstFlightDate = firstFlightDate;
            Age = age;
            Status = status;
            EngineType = engineType;
            EngineCount = engineCount;
        }

        public string Registration { get; }
        public string? Model { get; }
        public DateTime? RolloutDate { get; }
        public DateTime? FirstFlightDate { get; }
        public int? Age { get; }
        public string? Status { get; }
        public string? EngineType { get; }
        public int? EngineCount { get; }

        public static AircraftModel FromDbModel(Aircraft aircraft)
        {
            return new AircraftModel(
                registration: aircraft.Registration,
                model: aircraft.Model,
                rolloutDate: aircraft.RolloutDate,
                firstFlightDate: aircraft.FirstFlightDate,
                age: aircraft.Age,
                status: aircraft.Status,
                engineType: aircraft.EngineType,
                engineCount: aircraft.EngineCount
            );
        }
    }
}