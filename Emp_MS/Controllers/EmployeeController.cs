using Emp_MS.Data;
using Emp_MS.Entity;
using Emp_MS.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Emp_MS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        public readonly IRepository<Employee> employeeRepository;
        private readonly IRepository<User> userRepo;

        public EmployeeController(IRepository<Employee> employeeRepository,IRepository<User> userRepo)
        {
            this.employeeRepository = employeeRepository;
            this.userRepo = userRepo;
        }

        [HttpGet]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> GetEmploayeeList()
        {
            return Ok(await employeeRepository.GetAll());
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetEmploayeeList([FromRoute] int id)
        {
            return Ok(await employeeRepository.FindByIdAsync(id));
        }

        [HttpPost]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> AddEmployee([FromBody]Employee model)
        {
            var user = new User()
            {
                Email = model.Email,
                Role = "Employee",
                Password = (new PasswordHelper()).HashPassword("12345")
            };
            await userRepo.AddAsync(user);
            model.User = user;
           // model.userId = (await userRepo.GetAll(x => x.Email == model.Email)).FirstOrDefault()!.Id;
            await employeeRepository.AddAsync(model);
            await employeeRepository.SaveChangeAsync();
            return Ok();
        }

        [HttpPut("{Id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateEmployee([FromRoute] int Id,[FromBody] Employee model)
        {
            var employee = await employeeRepository.FindByIdAsync(Id);
            employee.Name = model.Name;
            employee.Email = model.Email;
            employee.Phone = model.Phone;
            employee.JobTitle = model.JobTitle;
            employee.Gender = model.Gender;
            employee.DepartmentID = model.DepartmentID;
            employee.JoiningDate = model.JoiningDate; 
            employee.LastWorkingDate = model.LastWorkingDate;
            employee.DateOfBirth = model.DateOfBirth;
            employeeRepository.Update(employee);
            await employeeRepository.SaveChangeAsync();
            return Ok();
        }

        [HttpDelete("{Id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteEmployee([FromRoute] int Id)
        {
            await employeeRepository.DeleteAsync(Id);
            await employeeRepository.SaveChangeAsync();
            return Ok();
        }

    }
}
