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
        IEnumerable<Airport> Search(string? search);
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

        public IEnumerable<Airport> Search(string? search)
        {
            return _airports
                .Where(a => search == null || a.Iata == search);
        }

        public Airport Create(CreateAirportRequest request)
        {
            var response = _airports.Add(new Airport {Iata = request.Iata});
            _db.SaveChanges();
            return response.Entity;
        }
    }
}