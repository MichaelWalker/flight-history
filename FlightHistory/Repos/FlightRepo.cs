using System.Collections.Generic;
using System.Linq;
using FlightHistory.Models.Db;
using Microsoft.EntityFrameworkCore;

namespace FlightHistory.Repos
{
    public interface IFlightRepo
    {
        Flight SingleById(int id);
        IEnumerable<Flight> Search();
        Flight Create(Flight flight);
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

        public Flight SingleById(int id)
        {
            return All()
                .Single(f => f.Id == id);
        }

        public IEnumerable<Flight> Search()
        {
            return All();
        }

        public Flight Create(Flight flight)
        {
            var newFlight = _flights.Add(flight).Entity;
            _db.SaveChanges();

            return SingleById(newFlight.Id);
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