using System.ComponentModel.DataAnnotations;

namespace project_api.Models
{
    public class SensorDetails
    {
        public SensorDetails() {
            Senid = Guid.NewGuid();
        }
        [Key]
        public Guid Senid { get; set; }
        public string SensorName { get; set; }
        public string SensorStatus { get; set; }
        public string SensorLocation { get; set; }
        public string Performance { get; set; }
        public double MinValue { get; set; }
        public double MaxValue { get; set; }
        public double AvgValue { get; set; }
    }


}
