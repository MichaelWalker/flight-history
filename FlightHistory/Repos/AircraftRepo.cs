using System.Collections.Generic;
using System.Linq;
using FlightHistory.Models.Db;
using FlightHistory.Models.Requests;
using Microsoft.EntityFrameworkCore;

namespace FlightHistory.Repos
{
    public interface IAircraftRepo
    {
        Aircraft? SingleOrDefaultByRegistration(string registration);
        IEnumerable<Aircraft> Search(string? search);
        Aircraft Create(CreateAircraftRequest request);
    }
    
    public class AircraftRepo : IAircraftRepo
    {
        private readonly DbSet<Aircraft> _aircraft;
        private readonly DatabaseContext _db;

        public AircraftRepo(DatabaseContext db)
        {
            _aircraft = db.Aircraft;
            _db = db;
        }

        public Aircraft? SingleOrDefaultByRegistration(string registration)
        {
            return _aircraft.SingleOrDefault(a => a.Registration == registration);
        }

        public IEnumerable<Aircraft> Search(string? search)
        {
            return _aircraft
                .Where(a => search == null || a.Registration.ToLower().Contains(search.ToLower()));
        }

        public Aircraft Create(CreateAircraftRequest request)
        {
            var response = _aircraft.Add(new Aircraft
            {
                Registration = request.Registration,
                Model = request.Model,
                RolloutDate = request.RolloutDate,
                FirstFlightDate = request.FirstFlightDate,
                Age = request.Age,
                Status = request.Status,
                EngineType = request.EngineType,
                EngineCount = request.EngineCount,
            });

            _db.SaveChanges();
            return response.Entity;
        }
    }
}