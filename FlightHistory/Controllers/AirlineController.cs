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
    [Route("api/airlines")]
    public class AirlineController : ApiController
    {
        private readonly ILogger<AirlineController> _logger;
        private readonly IAirlineRepo _airlineRepo;

        public AirlineController(ILogger<AirlineController> logger, IAirlineRepo airlineRepo)
        {
            _logger = logger;
            _airlineRepo = airlineRepo;
        }

        [HttpPost("")]
        public IActionResult Create([FromBody] CreateAirlineRequest request)
        {
            _logger.LogInformation("Creating a new airline");
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Invalid create airline request.");
                return InvalidModelRequest();
            }

            var newAirline = _airlineRepo.Create(request);
            return Ok(AirlineModel.FromDbModel(newAirline));
        }
    }
}