namespace project_api.DtoModels
{
    public class SDDtoModel
    {
      

        public string SensorName { get; set; }
        public DateTime Timestamp { get; set; }
        public List<double> SensorValue { get; set; }
        public Guid ScadaId { get; set; }
    }
}

