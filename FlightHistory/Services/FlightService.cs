using FlightHistory.Models.Db;
using FlightHistory.Models.Requests;
using FlightHistory.Repos;

namespace FlightHistory.Services
{
    public interface IFlightService
    {
        Flight Create(RecordFlightRequest request);
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

        public Flight Create(RecordFlightRequest request)
        {
            var aircraft = _aircraftService.GetOrNew(request.Aircraft);

            return _flightRepo.Create(new Flight
            {
                Aircraft = aircraft,
                SourceId = request.Source,
                DestinationId = request.Destination,
                DepartureDate = request.DepartureDate,
                AirlineId = request.Airline
            });
        }
    }
}