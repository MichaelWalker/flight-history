using System.Collections.Generic;
using System.Linq;
using FlightHistory.Models.Api;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace FlightHistory.Controllers
{
    [ApiController]
    [Route("airports")]
    public class AirportController : ControllerBase
    {
        private readonly ILogger<AirportController> _logger;
        
        public AirportController(ILogger<AirportController> logger)
        {
            _logger = logger;
        }

        [HttpGet("")]
        public IEnumerable<AirportModel> Search()
        {
            return Enumerable.Empty<AirportModel>();
        }
    }
}