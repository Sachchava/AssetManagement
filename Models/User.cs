using System.ComponentModel.DataAnnotations;

namespace project_api.Models
{
    public class User
    {
        public User()
        {
            Uid = Guid.NewGuid();
            IsAdmin = false;
        }
        [Key]
        public Guid Uid { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool IsAdmin { get; set; }

    }
}