using System.Linq;
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

        [HttpGet("")]
        public IActionResult Search([FromQuery] string? search)
        {
            _logger.LogInformation("Searching for airports");
            var airports = _airportRepo.Search(search);
            return Ok(airports.Select(AirportModel.FromDbModel));
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