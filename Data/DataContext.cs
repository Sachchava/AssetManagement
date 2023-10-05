    using Microsoft.EntityFrameworkCore;
    using project_api.Interface;
    using project_api.Models;
    using System.Reflection;
using System.Reflection.Emit;

    namespace project_api.Data
    {
        public class DataContext : DbContext
        {
            public DataContext(DbContextOptions<DataContext> options) : base(options) { }
            public DbSet<User> Users { get; set; }
            public DbSet<Scada> Scadas { get; set; }
            public DbSet<Userview> Userview { get; set; }
            public DbSet<Csvdata> Csvdata { get; set; }
            public DbSet<ScadaDetails> ScadaDetails { get; set; }
            public DbSet<SensorDetails> SensorDetails { get; set; }
            
            protected override void OnModelCreating(ModelBuilder modelBuilder)
            {
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Uid = Guid.NewGuid(),
                    UserName = "admin",
                    Password = BCrypt.Net.BCrypt.HashPassword("1"),
                    IsAdmin = true,
                });
            base.OnModelCreating(modelBuilder);
                modelBuilder.Entity<Scada>()
                    .HasMany<ScadaDetails>(g => g.ScadaDetails)
                     .WithOne(s => s.Scada)
                     .HasForeignKey(s => s.ScadaId)
                     .OnDelete(DeleteBehavior.Cascade);
            }
        }
    }
