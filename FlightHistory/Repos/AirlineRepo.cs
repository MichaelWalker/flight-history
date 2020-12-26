using System.Linq;
using FlightHistory.Models.Db;
using FlightHistory.Models.Requests;
using Microsoft.EntityFrameworkCore;

namespace FlightHistory.Repos
{
    public interface IAirlineRepo
    {
        Airline Create(CreateAirlineRequest request);
    }
    
    public class AirlineRepo : IAirlineRepo
    {
        private DbSet<Airline> _airlines;
        private DatabaseContext _db;

        public AirlineRepo(DatabaseContext databaseContext)
        {
            _airlines = databaseContext.Airlines;
            _db = databaseContext;
        }

        public Airline Create(CreateAirlineRequest request)
        {
            var response = _airlines.Add(new Airline { Name = request.Name });
            _db.SaveChanges();
            return response.Entity;
        }
    }
}