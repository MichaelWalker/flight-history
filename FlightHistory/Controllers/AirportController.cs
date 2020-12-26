using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlightHistory.Models.Api;
using FlightHistory.Models.Requests;
using FlightHistory.Repos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace FlightHistory.Controllers
{
    [ApiController]
    [Route("api/airports")]
    [Authorize]
    public class AirportController : ApiController
    {
        private readonly ILogger<AirportController> _logger;
        private readonly IAirportRepo _airportRepo;
        
        public AirportController(ILogger<AirportController> logger, IAirportRepo airportRepo)
        {
            _logger = logger;
            _airportRepo = airportRepo;
        }

        [HttpPost("")]
        public IActionResult Create([FromBody] CreateAirportRequest request)
        {
            _logger.LogInformation("Creating a new airport");

            if (!ModelState.IsValid)
            {
                return InvalidModelRequest();
            }

            var airport = _airportRepo.Create(request);
            return Ok(AirportModel.FromDbModel(airport));
        }
    }
}