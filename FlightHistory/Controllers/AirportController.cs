using System.Collections.Generic;
using System.Linq;
using FlightHistory.Models.Api;
using FlightHistory.Repos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace FlightHistory.Controllers
{
    [ApiController]
    [Route("api/airports")]
    [Authorize]
    public class AirportController : ControllerBase
    {
        private readonly ILogger<AirportController> _logger;
        private readonly IAirports _airports;
        
        public AirportController(ILogger<AirportController> logger, IAirports airports)
        {
            _logger = logger;
            _airports = airports;
        }

        [HttpGet("")]
        public IEnumerable<AirportModel> Search()
        {
            _logger.LogInformation("Searching Airports");
            return _airports.Search()
                .Select(AirportModel.FromDbModel);
        }
    }
}