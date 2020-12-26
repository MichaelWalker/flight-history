using System.ComponentModel.DataAnnotations;

namespace FlightHistory.Models.Requests
{
    public class CreateAirlineRequest
    {
        [Required] 
        public string Name { get; set; } = null!;
    }
}