using FlightHistory.Repos;

namespace FlightHistory.Services
{
    public interface IAirportService
    { }
    
    public class AirportService : IAirportService
    {
        private readonly IAirportRepo _airportRepo;

        public AirportService(IAirportRepo airportRepo)
        {
            _airportRepo = airportRepo;
        }
    }
}