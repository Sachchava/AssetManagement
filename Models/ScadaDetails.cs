using System.ComponentModel.DataAnnotations;

namespace project_api.Models
{
    public class ScadaDetails
    {
        public ScadaDetails() {
            Sdid = Guid.NewGuid();
        }
        [Key]
        public Guid Sdid { get; set; }
        
        public string SensorName { get; set;}
        public DateTime Timestamp { get; set; }
        public double SensorValue { get; set; }
        public Guid ScadaId { get; set; }
        public  Scada Scada { get; set; }

    }
}
