using FlightHistory.Models.Db;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FlightHistory
{
    public class DatabaseContext : IdentityDbContext<User, Role, int>
    {
        public DbSet<Airport> Airports { get; set; } = null!;
        public DbSet<Aircraft> Aircraft { get; set; } = null!;
        public DbSet<Flight> Flights { get; set; } = null!;

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            
            builder.Entity<Aircraft>()
                .HasIndex(a => a.Registration)
                .IsUnique();

            builder.Entity<Airport>()
                .HasIndex(a => a.Iata)
                .IsUnique();
        }
    }
}