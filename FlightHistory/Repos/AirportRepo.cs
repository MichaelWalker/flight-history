using System.Collections.Generic;
using System.Linq;
using FlightHistory.Models.Db;
using FlightHistory.Models.Requests;
using Microsoft.EntityFrameworkCore;

namespace FlightHistory.Repos
{
    public interface IAirportRepo
    {
        Airport? SingleOrDefaultByIata(string iata);
        Airport Create(CreateAirportRequest request);
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

        public Airport Create(CreateAirportRequest request)
        {
            return _airports.Add(new Airport {Iata = request.Iata}).Entity;
        }
    }
}