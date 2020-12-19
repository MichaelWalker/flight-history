using FlightHistory.Models.Db;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FlightHistory
{
    public class DatabaseContext : IdentityDbContext<User, Role, int>
    {
        public DbSet<Airport> Airports { get; set; } = null!;

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        { }
    }
}