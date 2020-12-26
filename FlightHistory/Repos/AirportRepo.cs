using System.Collections.Generic;
using System.Linq;
using FlightHistory.Models.Db;
using FlightHistory.Models.Requests;
using Microsoft.EntityFrameworkCore;

namespace FlightHistory.Repos
{
    public interface IAirportRepo
    {
        Airport Create(CreateAirportRequest request);
    }
    
    public class AirportRepo : IAirportRepo
    {
        private readonly DbSet<Airport> _airports;
        private readonly DatabaseContext _db;

        public AirportRepo(DatabaseContext db)
        {
            _airports = db.Airports;
            _db = db;
        }

        public Airport? SingleOrDefaultByIata(string iata)
        {
            return _airports.SingleOrDefault(a => a.Iata == iata);
        }

        public Airport Create(CreateAirportRequest request)
        {
            var response = _airports.Add(new Airport {Iata = request.Iata});
            _db.SaveChanges();
            return response.Entity;
        }
    }
}