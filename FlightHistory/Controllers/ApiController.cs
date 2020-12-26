using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace FlightHistory.Controllers
{
    public abstract class ApiController : ControllerBase
    {
        protected IActionResult InvalidModelRequest()
        {
            return BadRequest(ModelState.Values.SelectMany(v => v.Errors));
        }
    }
}