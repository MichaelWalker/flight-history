using System.Collections.Generic;
using System.Linq;
using FlightHistory.Models.Db;
using Microsoft.EntityFrameworkCore;

namespace FlightHistory.Repos
{
    public interface IAirportRepo
    {
        Airport? SingleOrDefaultByIata(string iata);
        IEnumerable<Airport> Search();
    }
    
    public class AirportRepo : IAirportRepo
    {
        private readonly DbSet<Airport> _airports;

        public AirportRepo(DatabaseContext db)
        {
            _airports = db.Airports;
        }

        public Airport? SingleOrDefaultByIata(string iata)
        {
            return _airports.SingleOrDefault(a => a.Iata == iata);
        }

        public IEnumerable<Airport> Search()
        {
            return _airports;
        }
    }
}