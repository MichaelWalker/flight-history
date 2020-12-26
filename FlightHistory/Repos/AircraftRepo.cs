using System.Linq;
using FlightHistory.Models.Db;
using Microsoft.EntityFrameworkCore;

namespace FlightHistory.Repos
{
    public interface IAircraftRepo
    {
        Aircraft? SingleOrDefaultByRegistration(string registration);
    }
    
    public class AircraftRepo : IAircraftRepo
    {
        private readonly DbSet<Aircraft> _aircraft;

        public AircraftRepo(DatabaseContext db)
        {
            _aircraft = db.Aircraft;
        }

        public Aircraft? SingleOrDefaultByRegistration(string registration)
        {
            return _aircraft.SingleOrDefault(a => a.Registration == registration);
        }
    }
}