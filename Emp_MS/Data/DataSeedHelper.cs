using Emp_MS.Entity;
using Emp_MS.Service;
using System.Runtime.CompilerServices;

namespace Emp_MS.Data
{
    public class DataSeedHelper
    {
        private readonly AppDbContext dbContext;
        public DataSeedHelper(AppDbContext dbContext) {
        this.dbContext = dbContext;
        }

        public void InsertData()
        {
            if (!dbContext.Employees.Any())
            {
                dbContext.Employees.Add(
                    new Employee { Name = "Suraj" });
                dbContext.Employees.Add(
                    new Employee { Name = "Amit" });
            }
            

            if (!dbContext.Users.Any()) {
                var passwordHelper = new PasswordHelper();
                dbContext.Users.Add(new User()
                {
                    Email="admin@test.com",
                    Password= passwordHelper.HashPassword("12345"),
                    Role="Admin"
                });
                dbContext.Users.Add(new User()
                {
                    Email = "emp1@test.com",
                    Password = passwordHelper.HashPassword("12345"),
                    Role = "Employee"
                });
            }
            
            dbContext.SaveChanges();
        }
    }
}
