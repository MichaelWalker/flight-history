using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FlightHistory.Models.Db
{
    public class Airline
    {
        [Key] 
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]        
        public int Id { get; set; }
        
        public string Name { get; set; } = null!;
    }
}