namespace project_api.DtoModels
{
    public class SensorDetailsDtoModel
    {
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
