using System;
using System.Linq;
using System.Threading.Tasks;
using FlightHistory.Data.SampleData;
using FlightHistory.Models.Db;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace FlightHistory
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            using var scope = host.Services.CreateScope();
            var serviceProvider = scope.ServiceProvider;
            var dbContext = serviceProvider.GetService<DatabaseContext>();
            var userManager = serviceProvider.GetService<UserManager<User>>();
            
            if (IsDevEnvironment(serviceProvider))
            {
                // SQLite doesn't support many of the migrations that are needed.
                // So... instead we just create the Tables directly from the models.
                // To 'migrate'... just delete the existing DB and re-run.
                dbContext.Database.EnsureCreated();

                if (DatabaseIsEmpty(dbContext))
                {
                    PopulateWithSampleData(dbContext, userManager).Wait();
                }
            }
            else
            {
                dbContext.Database.Migrate();
            }
            
            host.Run();
        }

        private static bool IsDevEnvironment(IServiceProvider serviceProvider)
        {
            var env = serviceProvider.GetRequiredService<IWebHostEnvironment>();
            return env.IsDevelopment();
        }
        
        private static bool DatabaseIsEmpty(DatabaseContext databaseContext)
        {
            return !databaseContext.Airports.Any();
        }
        
        private static async Task PopulateWithSampleData(DatabaseContext databaseContext, UserManager<User> userManager)
        {
            databaseContext.Airports.AddRange(SampleAirports.Generate());
            databaseContext.Aircraft.AddRange(SampleAircraft.Generate());
            databaseContext.Airlines.AddRange(SampleAirlines.Generate());
            databaseContext.Flights.AddRange(SampleFlights.Generate());
            databaseContext.SaveChanges();
            
            await userManager.CreateAsync(new User {UserName = "user", Email = "user@sample.com", Name = "User"}, "Password_1");
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
    }
}