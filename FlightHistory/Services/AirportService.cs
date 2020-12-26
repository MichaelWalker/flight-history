using FlightHistory.Models.Db;
using FlightHistory.Repos;

namespace FlightHistory.Services
{
    public interface IAirportService
    {
        Airport GetOrNew(string iata);
    }
    
    public class AirportService : IAirportService
    {
        private readonly IAirportRepo _airportRepo;

        public AirportService(IAirportRepo airportRepo)
        {
            _airportRepo = airportRepo;
        }

        public Airport GetOrNew(string iata)
        {
            var existingAirport = _airportRepo.SingleOrDefaultByIata(iata);
            if (existingAirport != null)
            {
                return existingAirport;
            }

            return new Airport
            {
                Iata = iata,
            };
        }
    }
}