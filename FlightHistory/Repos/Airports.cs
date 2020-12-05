using System.Collections.Generic;
using FlightHistory.Models.Db;

namespace FlightHistory.Repos
{
    public interface IAirports
    {
        IEnumerable<Airport> Search();
    }
    
    public class Airports : IAirports
    {
        private readonly DatabaseContext _db;
        
        public Airports(DatabaseContext db)
        {
            _db = db;
        }
        
        public IEnumerable<Airport> Search()
        {
            return _db.Airports;
        }
    }
}