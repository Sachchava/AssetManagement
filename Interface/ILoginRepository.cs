using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project_api.DtoModels;
using project_api.Models;

namespace project_api.Interface
{
    public interface ILoginRepository
    {
        public Task<bool> AddUser(UserDtoModel user);
        public Task<bool> DeleteUser(UserDtoModel user);
        public Task<bool> LoginUser(UserDtoModel user);
        public Task<bool> AddScada(ScadaDtoModel scada);
        public Task<bool> AddView(ViewDtoModel view);
        public Task<bool> AddSensorDetails(SensorDetailsDtoModel sensorDetails);
        public Task<bool>  AddScadaDetails(SDDtoModel scadaDetails);
        public Task<bool> DeleteScadaDetails(string scadaname);
        public Task<List<Scada>> GetScadaByUserName(string userName);
        public Task<List<Scada>> GetAllScadas();
        public Task<List<ScadaDetails>> GetSensorDataByScadaName(string scadaName);
        public Task<List<SensorDetails>> GetSensorDetailsBySensorName(string sensorName);
        public Task<List<ScadaDetailsDtoModel>> GetScadaDetailsByUserName(string userName);
        public Task<string> getScadaIdByName(string scadaName);
        public Task<string> GetUniqueScadaNames();

    }
}
