using Microsoft.AspNetCore.Mvc;
using project_api.DtoModels;
using project_api.Interface;
/*using CsvHelper;*/
using Microsoft.AspNetCore.Http;
using project_api.Models;
using System.Globalization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Security.Cryptography;
using System.Diagnostics;
using Newtonsoft.Json.Linq;

namespace project_api.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly ILoginRepository _loginRepository;
        public LoginController(ILoginRepository loginRepository) {
            _loginRepository = loginRepository;
        }
        

        [HttpDelete("removeUser")]
        public async Task<ActionResult> DeleteUser([FromBody] UserDtoModel user)
        {
            try { 
                if (user == null) { return BadRequest("error in controller no user provided"); }
                else { 
                    var removed = await _loginRepository.DeleteUser(user);
                    if (removed) { return Ok("deleted successfully"); }
                    else { return BadRequest("user did not got deleted check repository"); }
                }
            }
            catch (Exception e){ return BadRequest(e.Message+"error in controller catch"); }
        }




        [HttpPost("AddView")]
        public async Task<ActionResult> AddView(ViewDtoModel view)
        {
            try { 
                if (view == null) { return BadRequest("Error in controller no view"); }
                else
                {
                    var viewAdded = await _loginRepository.AddView(view);
                    if (viewAdded) { return Ok("View added succesfully"); }
                    else { return BadRequest("View didnt got added returned false from repository"); }
                }
            }
            catch (Exception e) { return BadRequest(e.Message); }
        }

        
        [HttpPost("Addscadadetails")]
        public async Task<ActionResult> AddScadaDetails(SDDtoModel model)
        {
            if (model == null)
            {
                return BadRequest("no model provided");
            }
            else
            {
                var added = await _loginRepository.AddScadaDetails(model);
                if (added) { return Ok("added succesfully"); }
                else { return BadRequest("not added"); }


            }
        }
        [HttpPost("addScada")]
        public async Task<ActionResult> AddScada(ScadaDtoModel scada)
        {
            try
            {
                if (scada == null) { return BadRequest("null scada provided"); }
                else
                {
                    var chechScada = await _loginRepository.AddScada(scada);
                    if (chechScada) { return Ok("Scada added successfully"); }
                    else
                    {
                        return BadRequest("Error while adding scada in controller or scada already exists");
                    }
                }
            }
            catch (Exception e) { return BadRequest(e + "Error in controller catch"); }
        }
       
        [HttpGet("scadas_for_users")]

        public async Task<ActionResult> getcalscadadetails(string username)
        {
            try
            {
                var details = await _loginRepository.GetScadaDetailsByUserName(username);
                return Ok(details);
            }
            catch (Exception e) { return BadRequest(e.Message); }
        }

        [HttpGet("getscadadetails")]
        public async Task<ActionResult<List<ScadaDetails>>> GetSensorDataByScadaName(string scadaname)
        {
            try
            {
                var scadadata = await _loginRepository.GetSensorDataByScadaName(scadaname);
                return Ok(scadadata);
            }
            catch (Exception e) { return StatusCode(500, e); }
        }

        [HttpDelete("deletescadas")]
        public async Task<ActionResult> Deletescadadetails(string scadaname)
        {
            var deleted = await _loginRepository.DeleteScadaDetails(scadaname);
            if (deleted) { return Ok("deleted successfully"); }
            else { return BadRequest("not deleted"); }
        }
        [HttpGet("uniquescadas")]
        public async Task<ActionResult> getalluniquescadas()
        {
            try
            {
                var getall = await _loginRepository.GetUniqueScadaNames();

                return Ok(getall);
            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }

        [HttpGet("get_scadaid")]
        public async Task<ActionResult> getscadaId(string scadaname)
        {
            try { 
                var getID = await _loginRepository.getScadaIdByName(scadaname);
                if (getID!=null) { return Ok(getID); }
                else { return BadRequest("no such scada"); }
            }
            catch (Exception e){
                return BadRequest("error in controller");
            }
        }

        [HttpPost("AddSensorDetails")]
        public async Task<ActionResult> addSensordetails([FromBody] SensorDetailsDtoModel model)
        {
            try 
            { 
                if (model == null)
                {
                    return BadRequest("no model provided");
                }
                else
                {
                    var getsensorsd = await _loginRepository.AddSensorDetails(model);
                    if (getsensorsd)
                    {
                        return Ok("Sensor Details added successfully");
                    }
                    return BadRequest("returned false from repository");
                }
            }
            catch { return BadRequest("Error in catch"); }
        }

       
      
        [HttpGet("getsensordetails")]
        public async Task<ActionResult<List<SensorDetails>>> getsensordetails(string sensorname)
        {
            try
            {
                if (sensorname == null) { return BadRequest("no sensorname given"); }
                else
                {
                    var sensordata = await _loginRepository.GetSensorDetailsBySensorName(sensorname);
                    return Ok(sensordata);
                }
            }
            catch { return BadRequest("error in controller"); }
            
        }
       
        
        private static Dictionary<string, string> activeSessions = new Dictionary<string, string>();
        [HttpPost("login")]
        public async Task<ActionResult<string>> LoginUser([FromBody] UserDtoModel user)
        {
            try
            {
                if (user == null)
                {
                    return BadRequest("No user given in controller");
                }
                else if (activeSessions.Count>0) {
                    return BadRequest("User is already logged in wait...");
                }
                else
                {
                    var isLogged = await _loginRepository.LoginUser(user);
                    if (isLogged) {
                       
                        activeSessions.Add(user.UserName,Guid.NewGuid().ToString());
                        var keyBytes = new byte[32];
                        using (var rng = RandomNumberGenerator.Create())
                        {
                            rng.GetBytes(keyBytes);
                        }
                        var secureKey = Convert.ToBase64String(keyBytes);

                        var key = Encoding.ASCII.GetBytes(secureKey);

                        var tokenHandler = new JwtSecurityTokenHandler();
                        var tokenDescriptor = new SecurityTokenDescriptor
                        {
                            Subject = new ClaimsIdentity(new Claim[]
                            {

                        new Claim(ClaimTypes.Name, user.UserName),

                            }),
                            Expires = DateTime.UtcNow.AddHours(1),
                            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                        };
                        var token = tokenHandler.CreateToken(tokenDescriptor);
                        var tokenString = tokenHandler.WriteToken(token);
                        var response = new
                        {
                            Token = tokenString,
                            UserName = user.UserName
                        };
                        return Ok(response);
                     
                    }
                    else { return BadRequest("Some error in repository or invalid credentials"); }
                }
            }
            catch (Exception e) { return BadRequest(e + "error in catch in controller"); }
        }

        /*var keyBytes = new byte[32]; 
                       using (var rng = RandomNumberGenerator.Create())
                       {
                           rng.GetBytes(keyBytes);
                       }

                       var secureKey = Convert.ToBase64String(keyBytes);
                       var tokenHandler = new JwtSecurityTokenHandler();
                       var key = Encoding.ASCII.GetBytes(secureKey); 
                       var tokenDescriptor = new SecurityTokenDescriptor
                       {
                           Subject = new ClaimsIdentity(new Claim[]
                           {
                             new Claim(ClaimTypes.Name, user.UserName),

                               new Claim("roles", "user,admin"),
                           }),
                           Expires = DateTime.UtcNow.AddHours(1), 
                           SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                       };
                       var token = tokenHandler.CreateToken(tokenDescriptor);
                       var tokenString = tokenHandler.WriteToken(token);*/


        [HttpPost("logout")]
        public ActionResult LogoutUser(string username)
        {
            try
            {
                Console.WriteLine(username, activeSessions);
                if (activeSessions.ContainsKey(username))
                {
                    activeSessions.Remove(username);
                    return Ok("User logged out");
                }
                else { return BadRequest("User not found in active sessions"); }
            }
            catch (Exception e) { return BadRequest(e.Message); }
        }
        [HttpGet("getScadas")]
        public async Task<ActionResult<List<Scada>>> GetScadaByUserName(string userName)
        {
            var scadas = await _loginRepository.GetScadaByUserName(userName);
            if (scadas.Count == 0) { return NotFound("No Scada Found"); }
            return Ok(scadas);
        }
        [HttpGet("getallscadas")]
        public async Task<ActionResult<List<Scada>>> GetAllScadas()
        {
            try {
                List<Scada> scadas = await _loginRepository.GetAllScadas();
                return Ok(scadas);  
            }
            catch (Exception e) { return StatusCode(500,"an error occured"); }
        }

        [HttpPost("CreateUser")]
        public async Task<ActionResult> AddUser([FromBody] UserDtoModel user)
        {
            try { 
                if (user == null) {
                    return BadRequest("error in Controller no user");
                }
                else
                {
                    if (user.UserName == "admin") { return BadRequest("cannot create a username \"admin\""); }
                    var result = await _loginRepository.AddUser(user);
                    if (result)
                    {
                        return Ok("User Added");
                    }
                    else
                    {
                        return BadRequest("Failed to add user");
                    }
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message+"error in controllers catch ");

            }
        }

       
        

    }
}
