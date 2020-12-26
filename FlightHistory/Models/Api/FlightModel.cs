﻿using System;
using FlightHistory.Models.Db;

namespace FlightHistory.Models.Api
{
    public readonly struct FlightModel
    {
        public FlightModel(AircraftSummary aircraft, AirportSummary source, AirportSummary desination, DateTime departureDate, AirlineSummary airline)
        {
            Aircraft = aircraft;
            Source = source;
            Desination = desination;
            DepartureDate = departureDate;
            Airline = airline;
        }

        public AircraftSummary Aircraft { get; }
        public AirportSummary Source { get; }
        public AirportSummary Desination { get; }
        public DateTime DepartureDate { get; }
        public AirlineSummary Airline { get; }
        
        public static FlightModel FromDbModel(Flight flight)
        {
            return new FlightModel(
                aircraft: AircraftSummary.FromDbModel(flight.Aircraft),
                source: AirportSummary.FromDbModel(flight.Source),
                desination: AirportSummary.FromDbModel(flight.Desination),
                departureDate: flight.DepartureDate,
                airline: AirlineSummary.FromDbModel(flight.Airline)
            );
        }
    }

    public readonly struct AirportSummary
    {
        public AirportSummary(int id, string? iata)
        {
            Id = id;
            Iata = iata;
        }

        public int Id { get; }
        public string? Iata { get; }

        public static AirportSummary FromDbModel(Airport airport)
        {
            return new AirportSummary(airport.Id, airport.Iata);
        }
    }

    public readonly struct AircraftSummary
    {
        public AircraftSummary(string reference)
        {
            Reference = reference;
        }

        public string Reference { get; }

        public static AircraftSummary FromDbModel(Aircraft aircraft)
        {
            return new AircraftSummary(aircraft.Registration);
        }
    }
    
    public readonly struct AirlineSummary
    {
        public AirlineSummary(string name)
        {
            Name = name;
        }

        public string Name { get; }

        public static AirlineSummary FromDbModel(Airline airline)
        {
            return new AirlineSummary(airline.Name);
        }
    }
}