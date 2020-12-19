using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption;

namespace FlightHistory.Models.Db
{
    public class Airport
    {
        [Key]
        [DatabaseGenerated(Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        
        public Airport(string name)
        {
            Name = name;
        }
    }
}