using System.ComponentModel.DataAnnotations;

namespace project_api.Models
{
    public class Scada
    {
        public Scada()
        {
            Sid = Guid.NewGuid();
           
        }
        [Key]
        public Guid Sid { get; set; }
        public string ScadaName { get; set; }
        public string ScadaDesc { get; set; }
        public ICollection<ScadaDetails> ScadaDetails { get; set; }

    }
}
