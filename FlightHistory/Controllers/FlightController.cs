﻿using System.Linq;
using FlightHistory.Models.Api;
using FlightHistory.Models.Requests;
using FlightHistory.Repos;
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
        private readonly IFlightRepo _flightRepo;

        public FlightController(IFlightService flightService, ILogger<FlightController> logger, IFlightRepo flightRepo)
        {
            _flightService = flightService;
            _logger = logger;
            _flightRepo = flightRepo;
        }

        [HttpGet("")]
        public IActionResult Search()
        {
            _logger.LogInformation("Fetching flight records");
            var flights = _flightRepo.Search();

            return Ok(flights.Select(FlightModel.FromDbModel));
        }

        [HttpPost("")]
        public IActionResult Create([FromBody] RecordFlightRequest request)
        {
            _logger.LogInformation("Recording new flight");
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Rejecting sign in request - invalid request model");
                return InvalidModelRequest();
            }

            var newFlight = _flightService.Create(request);
            return Ok(FlightModel.FromDbModel(newFlight));
        }
    }
}