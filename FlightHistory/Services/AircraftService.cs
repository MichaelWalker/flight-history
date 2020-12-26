using System.Threading.Tasks;
using FlightHistory.Models.Db;
using FlightHistory.Repos;

namespace FlightHistory.Services
{
    public interface IAircraftService
    {
        Aircraft GetOrNew(string registration);
    }
    
    public class AircraftService : IAircraftService
    {
        private readonly IAircraftRepo _aircraft;

        public AircraftService(IAircraftRepo aircraft)
        {
            _aircraft = aircraft;
        }

        public Aircraft GetOrNew(string registration)
        {
            var existingAircraft = _aircraft.SingleOrDefaultByRegistration(registration);
            if (existingAircraft != null)
            {
                return existingAircraft;
            }

            // Add extra methods that populate all the data here.
            return new Aircraft
            {
                Registration = registration,
            };
        }
    }
}