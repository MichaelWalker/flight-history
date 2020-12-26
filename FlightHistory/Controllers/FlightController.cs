using FlightHistory.Models.Api;
using FlightHistory.Models.Requests;
using FlightHistory.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace FlightHistory.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/flights")]
    public class FlightController : ApiController
    {
        private readonly ILogger<FlightController> _logger;
        private readonly IFlightService _flightService;

        public FlightController(IFlightService flightService, ILogger<FlightController> logger)
        {
            _flightService = flightService;
            _logger = logger;
        }

        [HttpPost("")]
        public IActionResult RecordFlight([FromBody] RecordFlightRequest request)
        {
            _logger.LogInformation("Recording new flight");
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Rejecting sign in request - invalid request model");
                return InvalidModelRequest();
            }

            var newFlight = _flightService.RecordFlight(request);
            return Ok(FlightModel.FromDbModel(newFlight));
        }
    }
}