using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using FlightHistory.Models;
using FlightHistory.Models.Db;
using FlightHistory.Repos;
using FlightHistory.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;

namespace FlightHistory
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DatabaseContext>(options =>
                options.UseSqlite(Configuration.GetConnectionString("DefaultConnection"))
            );

            services.AddIdentity<User, Role>(options =>
                {
                    // Mostly use the default settings, as they are fairly sensible.
                    // https://docs.microsoft.com/en-us/aspnet/core/security/authentication/identity-configuration?view=aspnetcore-3.1

                    options.User.RequireUniqueEmail = true;
                })
                .AddEntityFrameworkStores<DatabaseContext>();

            var signingKeyBytes = Encoding.ASCII.GetBytes(Configuration.GetValue<string>("JwtConfig:signingKey"));
            var jwtSigningKey = new SymmetricSecurityKey(signingKeyBytes);
            var jwtSettings = new JwtSettings(
                issuer: Configuration.GetValue<string>("JwtConfig:issuer"),
                audience: Configuration.GetValue<string>("JwtConfig:audience"),
                signingKey: jwtSigningKey,
                accessTokenExpiryMinutes: Configuration.GetValue<int>("JwtConfig:accessTokenExpiryMinutes"),
                refreshTokenExpiryMinutes: Configuration.GetValue<int>("JwtConfig:refreshTokenExpiryMinutes")
            );
            
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,	            
                ValidIssuer = jwtSettings.Issuer,	            
                ValidateAudience = true,	            
                ValidAudience = jwtSettings.Audience,	            
                ValidateIssuerSigningKey = true,	            
                IssuerSigningKey = jwtSettings.SigningKey,	            
                ValidateLifetime = true,	            
                ClockSkew = TimeSpan.Zero	      
            };
            
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options => {	        
                options.TokenValidationParameters = tokenValidationParameters;
            });
            
            services.AddControllers();

            services.AddTransient<IAirports, Airports>();
            services.AddTransient<IAuthService, AuthService>();
            services.AddTransient<ITokenService, TokenService>();

            services.AddSingleton(jwtSettings);
            services.AddSingleton(tokenValidationParameters);
            services.AddSingleton(new JwtSecurityTokenHandler());
            
            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration => { configuration.RootPath = "ClientApp/build"; });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, DatabaseContext databaseContext)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
            
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start:with-asp");
                }
            });
        }
    }
}