using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        private readonly IAirportRepo _airportRepo;
        
        public AirportController(ILogger<AirportController> logger, IAirportRepo airportRepo)
        {
            _logger = logger;
            _airportRepo = airportRepo;
        }

        [HttpGet("")]
        public IEnumerable<AirportModel> Search()
        {
            _logger.LogInformation("Searching Airports");
            return _airportRepo.Search()
                .Select(AirportModel.FromDbModel);
        }
    }
}