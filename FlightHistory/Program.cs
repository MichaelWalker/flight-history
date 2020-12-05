using System;
using System.Linq;
using FlightHistory.Data.SampleData;
using Microsoft.AspNetCore.Hosting;
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
            
            if (IsDevEnvironment(serviceProvider) && DatabaseIsEmpty(serviceProvider))
            {
                PopulateWithSampleData(serviceProvider);
            }
            
            host.Run();
        }

        private static bool IsDevEnvironment(IServiceProvider serviceProvider)
        {
            var env = serviceProvider.GetRequiredService<IWebHostEnvironment>();
            return env.IsDevelopment();
        }
        
        private static bool DatabaseIsEmpty(IServiceProvider serviceProvider)
        {
            var db = serviceProvider.GetRequiredService<DatabaseContext>();
            return !db.Airports.Any();
        }
        
        private static void PopulateWithSampleData(IServiceProvider serviceProvider)
        {
            var db = serviceProvider.GetRequiredService<DatabaseContext>();
            
            db.Airports.AddRange(SampleAirports.Generate());

            db.SaveChanges();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
    }
}