using System.ComponentModel.DataAnnotations;

namespace project_api.Models
{
    public class Csvdata
    {
        public Csvdata() {
            Csvid = Guid.NewGuid();
        }
        [Key]
        public Guid Csvid { get; set; }
        public string SensorName { get; set; }
        public DateTime Timestamp { get; set; }
        public double SensorValue { get; set; }
       /* public Guid Sid { get; set; }
        public Scada Scada { get; set; }*/
    }
} 
    