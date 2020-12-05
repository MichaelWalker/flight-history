using FlightHistory.Models.Db;
using Microsoft.EntityFrameworkCore;

namespace FlightHistory
{
    public class DatabaseContext : DbContext
    {
        public DbSet<Airport> Airports { get; set; }

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        { }
    }
}