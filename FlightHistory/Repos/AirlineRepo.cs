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

        public AirlineRepo(DatabaseContext databaseContext)
        {
            _airlines = databaseContext.Airlines;
        }

        public Airline Create(CreateAirlineRequest request)
        {
            return _airlines.Add(new Airline { Name = request.Name }).Entity;
        }
    }
}