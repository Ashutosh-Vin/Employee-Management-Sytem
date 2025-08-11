using Emp_MS.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Emp_MS.Data
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Employee> Employees { get; set; }

        public DbSet<Department> Department { get; set; }

        public DbSet<User> Users { get; set; }
    }
}
