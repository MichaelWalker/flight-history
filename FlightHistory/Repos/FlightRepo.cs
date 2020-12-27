using System.Collections.Generic;
using System.Linq;
using FlightHistory.Models.Db;
using FlightHistory.Models.Requests;
using Microsoft.EntityFrameworkCore;

namespace FlightHistory.Repos
{
    public interface IFlightRepo
    {
        IEnumerable<Flight> Search();
        Flight Create(RecordFlightRequest flight);
    }
    
    public class FlightRepo : IFlightRepo
    {
        private readonly DatabaseContext _db;
        private readonly DbSet<Flight> _flights;
        
        public FlightRepo(DatabaseContext db)
        {
            _db = db;
            _flights = db.Flights;
        }

        public IEnumerable<Flight> Search()
        {
            return All();
        }

        public Flight Create(RecordFlightRequest request)
        {
            var newFlight = _flights.Add(new Flight
            {
                AircraftId = request.Aircraft,
                SourceId = request.Source,
                DestinationId = request.Destination,
                DepartureDate = request.DepartureDate,
                AirlineId = request.Airline
            });
            _db.SaveChanges();

            return SingleById(newFlight.Entity.Id);
        }

        private IEnumerable<Flight> All()
        {
            return _flights
                .Include(f => f.Aircraft)
                .Include(f => f.Source)
                .Include(f => f.Destination)
                .Include(f => f.Airline);
        }
    }
}