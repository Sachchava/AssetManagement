using System.ComponentModel.DataAnnotations;

namespace project_api.Models
{
    public class Userview
    {
        public Userview() {
            Id = Guid.NewGuid();
        }
        [Key]
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string ScadaName { get; set; }
    }
}
