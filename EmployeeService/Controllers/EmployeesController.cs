using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using EmployeeService.Models;
using SQLDataEntity;

namespace EmployeeService.Controllers
{
    [Authorize]
    public class EmployeesController : ApiController
    {
        private readonly EmployeeDBEntities db = new EmployeeDBEntities();

        // GET: api/Employees
        public IQueryable<EmployeeModel> GettblEmployees()
        {
            return GetEmployees();
        }

        // GET: api/Employees/5
        [ResponseType(typeof(EmployeeModel))]
        public IHttpActionResult GettblEmployee(int id)
        {
            EmployeeModel employee = GetEmployees().FirstOrDefault(i => i.ID == id);
            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }

        // PUT: api/Employees/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PuttblEmployee(int id, EmployeeModel employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != employee.ID)
            {
                return BadRequest();
            }

            tblEmployee tblEmployee = new tblEmployee()
            {
                ID = employee.ID,
                DepartmentId = employee.DepartmentId,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                Gender = employee.Gender,
                Salary = employee.Salary,
                JobTitle = employee.JobTitle,
            };

            db.Entry(tblEmployee).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblEmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Employees
        [ResponseType(typeof(EmployeeModel))]
        public IHttpActionResult PosttblEmployee(EmployeeModel employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            object Lock = new object();
            int empId = 0;
            lock (Lock)
            {
                empId = db.tblEmployees.Select(i => i.ID).DefaultIfEmpty(0).Max();
                employee.ID = empId;
                tblEmployee tblEmployee = new tblEmployee()
                {
                    ID = employee.ID,
                    DepartmentId = employee.DepartmentId,
                    FirstName = employee.FirstName,
                    LastName = employee.LastName,
                    Gender = employee.Gender,
                    Salary = employee.Salary,
                    JobTitle = employee.JobTitle
                };

                db.tblEmployees.Add(tblEmployee);
                int save = db.SaveChanges();

            }
            return CreatedAtRoute("DefaultApi", new { id = empId }, employee);
        }

        // DELETE: api/Employees/5
        [ResponseType(typeof(tblEmployee))]
        public IHttpActionResult DeletetblEmployee(int id)
        {
            tblEmployee tblEmployee = db.tblEmployees.Find(id);
            if (tblEmployee == null)
            {
                return NotFound();
            }

            db.tblEmployees.Remove(tblEmployee);
            db.SaveChanges();

            return Ok(tblEmployee);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TblEmployeeExists(int id)
        {
            return db.tblEmployees.Count(e => e.ID == id) > 0;
        }

        private IQueryable<EmployeeModel> GetEmployees()
        {
            return db.tblEmployees.Select(i => new EmployeeModel()
            {
                DepartmentName = db.tblDepartments.FirstOrDefault(d => d.ID == i.DepartmentId).Name,
                DepartmentLocation = db.tblDepartments.FirstOrDefault(d => d.ID == i.DepartmentId).Location,
                ID = i.ID,
                FirstName = i.FirstName,
                LastName = i.LastName,
                Gender = i.Gender,
                Salary = i.Salary,
                JobTitle = i.JobTitle
            });
        }
    }
}