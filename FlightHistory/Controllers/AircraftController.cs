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
    [Authorize]
    [Route("api/aircraft")]
    public class AircraftController : ApiController
    {
        private readonly ILogger<AircraftController> _logger;
        private readonly IAircraftRepo _aircraftRepo;
        
        public AircraftController(ILogger<AircraftController> logger, IAircraftRepo aircraftRepo)
        {
            _logger = logger;
            _aircraftRepo = aircraftRepo;
        }

        [HttpGet("")]
        public IActionResult Search([FromQuery] string? search)
        {
            _logger.LogInformation("Searching Aircraft");
            var aircraft = _aircraftRepo.Search(search);
            return Ok(aircraft.Select(AircraftModel.FromDbModel));
        }

        [HttpPost("")]
        public IActionResult Create([FromBody] CreateAircraftRequest request)
        {
            _logger.LogInformation("Adding new Aircraft");
            
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Invalid Create Aircraft Request");
                return InvalidModelRequest();
            }

            var aircraft = _aircraftRepo.Create(request);
            return Ok(AircraftModel.FromDbModel(aircraft));
        }
    }
}