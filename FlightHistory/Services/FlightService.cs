using FlightHistory.Models.Db;
using FlightHistory.Models.Requests;
using FlightHistory.Repos;

namespace FlightHistory.Services
{
    public interface IFlightService
    {
        Flight RecordFlight(RecordFlightRequest request);
    }
    
    public class FlightService : IFlightService
    {
        private readonly IAircraftService _aircraftService;
        private readonly IAirportService _airportService;
        private readonly IFlightRepo _flightRepo;

        public FlightService(IAircraftService aircraftService, IAirportService airportService, IFlightRepo flightRepo)
        {
            _aircraftService = aircraftService;
            _airportService = airportService;
            _flightRepo = flightRepo;
        }

        public Flight RecordFlight(RecordFlightRequest request)
        {
            var aircraft = _aircraftService.GetOrNew(request.AircraftRegistration);
            var source = _airportService.GetOrNew(request.SourceIata);
            var destination = _airportService.GetOrNew(request.DestinationIata);

            return _flightRepo.Create(new Flight
            {
                Aircraft = aircraft,
                Source = source,
                Desination = destination,
                DepartureDate = request.DepartureDate
            });
        }
    }
}