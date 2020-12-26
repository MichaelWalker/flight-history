using System.ComponentModel.DataAnnotations;

namespace FlightHistory.Models.Db
{
    public class Aircraft
    {
        [Key]
        public string Registration { get; set; } = null!;
    }
}