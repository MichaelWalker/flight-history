using System;
using System.Linq;
using FlightHistory.Data.SampleData;
using Microsoft.AspNetCore.Hosting;
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
            
            dbContext.Database.Migrate();
            if (IsDevEnvironment(serviceProvider) && DatabaseIsEmpty(dbContext))
            {
                PopulateWithSampleData(dbContext);
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
        
        private static void PopulateWithSampleData(DatabaseContext databaseContext)
        {
            databaseContext.Airports.AddRange(SampleAirports.Generate());
            databaseContext.SaveChanges();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
    }
}