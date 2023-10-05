using Microsoft.EntityFrameworkCore;
using project_api.Data;
using project_api.DtoModels;
using project_api.Interface;
using project_api.Models;
using BCrypt.Net;

using System.Security.Cryptography;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using project_api.Data;
using project_api.Models;
using System.Xml;
using Newtonsoft.Json;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
/*using CsvHelper.Configuration;
using CsvHelper;*/

namespace project_api.Repository
{
    public class LoginRepository : ILoginRepository
    {
        private readonly DataContext _context;
        public LoginRepository(DataContext context)
        {
            _context = context;
        }
        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0;
        }
        
        public async Task<bool> DeleteScadaDetails(string scadaname)
        {

            var deleteDetails1 = await _context.Scadas.Where(s => s.ScadaName.ToLower() == scadaname.ToLower()).ToListAsync();
            var deleteDetails2 = await _context.Userview.Where(s => s.ScadaName.ToLower() == scadaname.ToLower()).ToListAsync();

            if ( deleteDetails2 != null)
            {
                /*    _context.ScadaDetails.RemoveRange(deleteDetails);*/
                _context.Scadas.RemoveRange(deleteDetails1);
                _context.Userview.RemoveRange(deleteDetails2);

                Save(); 
                return true;
            }
            else { return false; }
        
        }

        public async Task<bool> AddScadaDetails(SDDtoModel requestBody)
        {
            try
            {
         

                for (int i=0;i<requestBody.SensorValue.Count;i++)
                {
                    
                    ScadaDetails scadaDetails = new ScadaDetails()
                    {
                     
                        SensorName = requestBody.SensorName,
                        Timestamp = DateTime.Now.AddMinutes(i),
                        SensorValue = requestBody.SensorValue[i],
                        ScadaId = requestBody.ScadaId
                    };
                    _context.ScadaDetails.Add(scadaDetails);
                    Save();
                }
                return true;
            }
            catch (Exception e){ return false; }
        }
        public async Task<bool> DeleteUser(UserDtoModel requestBody)
        {
            try
            {
                var existingUser = await _context.Users.FirstOrDefaultAsync(s => s.UserName.ToLower() == requestBody.UserName.ToLower());
                if (existingUser != null)
                {
                    _context.Users.Remove(existingUser);
                    return Save();
                }
                else { return false; }
            }
            catch
            {

                return false;
            }

        }
        public async Task<bool> LoginUser(UserDtoModel requestBody)
        {
            try
            {
                var checkIfExists = await _context.Users.FirstOrDefaultAsync(s => s.UserName.ToLower() == requestBody.UserName.ToLower());
                if (checkIfExists != null)
                {
                    if (BCrypt.Net.BCrypt.Verify(requestBody.Password, checkIfExists.Password)) { return true;}
                    else { return false; }
                }
                else { return false; }
            }
            catch { return false; }
        }
        public async Task<bool> AddScada(ScadaDtoModel requestBody)
        {
            try
            {
                var scadaExists = await _context.Scadas.AnyAsync(s => s.ScadaName.ToLower() == requestBody.ScadaName.ToLower());
                if (!scadaExists)
                {
                    Scada scada1 = new Scada()
                    {
                        ScadaName = requestBody.ScadaName,
                        ScadaDesc = requestBody.ScadaDesc
                    };
                    _context.Scadas.Add(scada1);
                    Save();
                    return true;
                }
                else { return false; }
            }
            catch { return false; }

        }
        public async Task<List<SensorDetails>> GetSensorDetailsBySensorName(string sensorName)
        {
            return await _context.SensorDetails
                .Where(s => s.SensorName.ToLower() == sensorName.ToLower())
                .Select(s => new SensorDetails
                {
                    Senid = s.Senid,
                    SensorName = s.SensorName,
                    SensorStatus = s.SensorStatus,
                    SensorLocation = s.SensorLocation,
                    Performance = s.Performance,
                    MinValue = s.MinValue,
                    MaxValue = s.MaxValue,
                    AvgValue = s.AvgValue
                }).ToListAsync();
        }
        public async Task<bool> AddSensorDetails(SensorDetailsDtoModel requestBody)
        {
            try {
                var sensorexists = await _context.SensorDetails.AnyAsync(s => s.SensorName.ToLower() == requestBody.SensorName.ToLower());
                if (!sensorexists)
                {
                    SensorDetails sensorDetails1 = new SensorDetails()
                    {
                        SensorName = requestBody.SensorName,
                        SensorStatus = requestBody.SensorStatus,
                        SensorLocation = requestBody.SensorLocation,
                        Performance = requestBody.Performance,
                        MinValue = requestBody.MinValue,
                        MaxValue = requestBody.MaxValue,
                        AvgValue = requestBody.AvgValue,
                    };
                    _context.SensorDetails.Add(sensorDetails1);
                    Save();

                    return true;
                }
                else { return false; }
            }
            catch { return false; }
        }
        /* return await _context.ScadaDetails
               .Where(sd=>sd.ScadaName == scadaname)
                 .OrderBy(sd => sd.SensorName)
               .Select(sd=>new ScadaDetails
               {
                   ScadaName = scadaname,
                   SensorName = sd.SensorName,
                   Timestamp = sd.Timestamp,
                   SensorValue = sd.SensorValue
               })
               .ToListAsync();*/
        public async Task<List<ScadaDetails>> GetSensorDataByScadaName(string scadaname)
        {
            var scada = await _context.Scadas
    .FirstOrDefaultAsync(s => s.ScadaName == scadaname);
            return await _context.ScadaDetails
       .Where(sd => sd.ScadaId == scada.Sid) 
       .OrderBy(sd => sd.SensorName)
       .Select(sd => new ScadaDetails
       {
           SensorName = sd.SensorName,
           Timestamp = sd.Timestamp,
           SensorValue = sd.SensorValue
       })
       .ToListAsync();
        }    
        

       
        public async Task<bool> AddView(ViewDtoModel requestBody)
        {
            try
            {                
                Userview userview1 = new Userview()
                {
                    UserName = requestBody.UserName,
                    ScadaName = requestBody.ScadaName
                };
                _context.Userview.Add(userview1);
                Save();
                return true;
            }

            catch { return false; }
        }
        public async Task<List<Scada>> GetAllScadas()
        {   
            return await _context.Scadas.ToListAsync();
        }
        public async Task<bool> AddUser(UserDtoModel requestBody)
        {
            try
            {
                var userExists = await _context.Users.AnyAsync(x => x.UserName.ToLower() == requestBody.UserName.ToLower());
                if (!userExists)
                {
                    var hashedpass = BCrypt.Net.BCrypt.HashPassword(requestBody.Password);
                    User user = new User()
                    {
                        UserName = requestBody.UserName,
                        Password = hashedpass
                    };
                    _context.Users.Add(user);
                    return Save();
                }
                return false;
            }
            catch
            {
                return false;
            }
        }
        public async Task<List<Scada>> GetScadaByUserName(string userName)
        {
            try {
                var scadaNames = await _context.Userview
                    .Where(uv=>uv.UserName.ToLower()==userName.ToLower())
                    .Select(uv=>uv.ScadaName)
                    .ToListAsync();

                return await _context.Scadas
                    .Where(s=>scadaNames.Contains(s.ScadaName))
                  
                    .ToListAsync();
                    
            }
            catch (Exception e) {
                Console.WriteLine(e.Message + "error in catch in repository");
                    return null; }
        }
        public async Task<List<ScadaDetailsDtoModel>> GetScadaDetailsByUserName(string userName)
        {
            try
            {
             
                var scadaNames = await _context.Userview
                     .Where(uv => uv.UserName.ToLower() == userName.ToLower())
                     .Select(uv => uv.ScadaName)
                     .ToListAsync();
               
                var scadaDetailsSummaryList = new List<ScadaDetailsDtoModel>();

                foreach (var scadaName in scadaNames)
                {
                    var scada = await _context.Scadas
                    .FirstOrDefaultAsync(s => s.ScadaName == scadaName);


                    var scadaDetailsSummary = await _context.ScadaDetails
                        .Where(sd => sd.ScadaId == scada.Sid)
                        .OrderByDescending(sd => sd.Timestamp)
                        .Select(sd => new ScadaDetailsDtoModel
                        {
                            ScadaName = scada.ScadaName,
                            Timestamp = sd.Timestamp,
                            SensorValue = _context.ScadaDetails
                                .Where(innerSd => innerSd.ScadaId == scada.Sid)
                                .Average(innerSd => innerSd.SensorValue)
                        })
                        .FirstOrDefaultAsync();

                    scadaDetailsSummaryList.Add(scadaDetailsSummary);
                }

                return scadaDetailsSummaryList;
            }
            catch (Exception e)
            {
                return new List<ScadaDetailsDtoModel>();
            }
        }
        public async Task<string> getScadaIdByName(string scadaname)
        {
         
                var scada = await _context.Scadas
                   .FirstOrDefaultAsync(s => s.ScadaName.ToLower() == scadaname.ToLower());
            return scada.Sid.ToString(); 
            
           
        }

        public async Task<string> GetUniqueScadaNames()
        {
            var scadaData = await _context.ScadaDetails
        .GroupBy(s => s.ScadaId)
        .Select(group => new
        {
            
            scadaName = _context.Scadas.FirstOrDefault(s => s.Sid == group.Key).ScadaName,
            timestamp = group.Max(s => s.Timestamp),
            sensorValue = group.Average(s => s.SensorValue)
        })
        .ToListAsync();

            var json = JsonConvert.SerializeObject(scadaData, Newtonsoft.Json.Formatting.None, new JsonSerializerSettings
            {
                DateFormatString = "yyyy-MM-dd HH:mm:ss.fffffff" 
            });

            return json;
        }

    }
}
