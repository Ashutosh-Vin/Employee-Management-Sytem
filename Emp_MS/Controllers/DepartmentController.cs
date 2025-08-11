using Emp_MS.Data;
using Emp_MS.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Emp_MS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IRepository<Department> departmentRepository;
        public DepartmentController(IRepository<Department> departmentRepository)
        {
            this.departmentRepository = departmentRepository;
        }

        [HttpPost]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> AddDepartment([FromBody]Department model)
        {
            await departmentRepository.AddAsync(model);
            await departmentRepository.SaveChangeAsync();
            return Ok(model);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateDepartment([FromRoute] int id,[FromBody] Department model)
        {
            var department = await departmentRepository.FindByIdAsync(id);
            department.Name = model.Name;
            departmentRepository.Update(department);
            await departmentRepository.SaveChangeAsync();
            return Ok(department);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllDepartment()
        {
            var list = await departmentRepository.GetAll();
            return Ok(list);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteDepartment([FromRoute] int id)
        {
            await departmentRepository.DeleteAsync(id);
            await departmentRepository.SaveChangeAsync();
            return Ok();
        }

    }
}
