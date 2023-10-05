namespace project_api.DtoModels
{
    public class ScadaDetailsDtoModel
    {
        public string ScadaName { get; set; }

        public string SensorName { get; set; }
        public DateTime Timestamp { get; set; }
        public double SensorValue { get; set; }
    }
}
