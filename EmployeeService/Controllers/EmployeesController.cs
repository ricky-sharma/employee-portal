using EmployeeService.Models;
using Microsoft.AspNet.Identity;
using SQLDataEntity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Description;

namespace EmployeeService.Controllers
{
    [Authorize]
    public class EmployeesController : ApiController
    {
        private readonly EmployeeDBEntities db = new EmployeeDBEntities();
        private string lockTransaction = "lockTransaction";

        // GET: api/Employees
        public IEnumerable<object> GettblEmployees()
        {
            return GetEmployees();
        }

        // GET: api/Employees/5
        [ResponseType(typeof(EmployeeModel))]
        public IHttpActionResult GettblEmployee(int id)
        {
            tblEmployee tblEmployee = db.tblEmployees.Find(id);
            if (tblEmployee == null)
            {
                return NotFound();
            }
            var employee = new EmployeeModel
            {
                Department = tblEmployee.Department,
                ID = tblEmployee.ID,
                FirstName = tblEmployee.FirstName,
                LastName = tblEmployee.LastName,
                Gender = tblEmployee.Gender,
                Salary = tblEmployee.Salary,
                JobTitle = tblEmployee.JobTitle,
                JoiningDate = tblEmployee.JoiningDate,
                LeavingDate = tblEmployee.LeavingDate,
                DateofBirth = tblEmployee.DateofBirth,
                Mobile = tblEmployee.Mobile,
                HomePhone = tblEmployee.HomePhone,
                Email = tblEmployee.Email,
                ProfessionalProfile = tblEmployee.ProfessionalProfile,
                EmploymentType = tblEmployee.EmploymentType,
                EducationQualification = tblEmployee.EducationQualification,
                IdentificationDocument = tblEmployee.IdentificationDocument,
                IdentificationNumber = tblEmployee.IdentificationNumber,
                ResidentialAddress = tblEmployee.ResidentialAddress != null ? (Guid)tblEmployee.ResidentialAddress : Guid.Empty,
                PostalAddress = tblEmployee.PostalAddress != null ? (Guid)tblEmployee.PostalAddress : Guid.Empty
            };

            return Ok(employee);
        }

        // PUT: api/Employees/5
        public IHttpActionResult PuttblEmployee(int id, EmployeeModel employee)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (id != employee.ID)
                {
                    return BadRequest();
                }

                var tEmployee = db.tblEmployees.Find(id);
                tEmployee.FirstName = employee.FirstName;
                tEmployee.LastName = employee.LastName;
                tEmployee.Gender = employee.Gender;
                tEmployee.Department = employee.Department;
                tEmployee.JobTitle = employee.JobTitle;
                tEmployee.JoiningDate = employee.JoiningDate ?? default;
                tEmployee.LeavingDate = employee.LeavingDate ?? null;
                tEmployee.DateofBirth = employee.DateofBirth;
                tEmployee.Mobile = employee.Mobile;
                tEmployee.HomePhone = employee.HomePhone;
                tEmployee.Email = employee.Email;
                tEmployee.ProfessionalProfile = employee.ProfessionalProfile;
                tEmployee.EmploymentType = employee.EmploymentType;
                tEmployee.EducationQualification = employee.EducationQualification;
                tEmployee.IdentificationDocument = employee.IdentificationDocument;
                tEmployee.IdentificationNumber = employee.IdentificationNumber;
                tEmployee.IsActive = true;
                tEmployee.UpdatedOn = DateTime.Now;
                tEmployee.UpdatedBy = User.Identity.GetUserId();
                tEmployee.ResidentialAddress = employee.ResidentialAddress;
                tEmployee.PostalAddress = employee.PostalAddress;
                db.Entry(tEmployee).State = EntityState.Modified;
                db.SaveChanges();
                return Ok(new { Message = "SUCCESS" });
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
        }

        // POST: api/Employees
        public IHttpActionResult PosttblEmployee(EmployeeModel employee)
        {
            tblEmployee tblEmployee = new tblEmployee();
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                int empId = 0;
                lock (lockTransaction)
                {
                    empId = db.tblEmployees.Select(i => i.ID).DefaultIfEmpty(0).Max();
                    tblEmployee.ID = empId;
                    tblEmployee.FirstName = employee.FirstName;
                    tblEmployee.LastName = employee.LastName;
                    tblEmployee.Gender = employee.Gender;
                    tblEmployee.Department = employee.Department;
                    tblEmployee.JobTitle = employee.JobTitle;
                    tblEmployee.JoiningDate = employee.JoiningDate ?? default;
                    tblEmployee.LeavingDate = employee.LeavingDate ?? (DateTime?)null;
                    tblEmployee.DateofBirth = employee.DateofBirth;
                    tblEmployee.Mobile = employee.Mobile;
                    tblEmployee.HomePhone = employee.HomePhone;
                    tblEmployee.Email = employee.Email;
                    tblEmployee.ProfessionalProfile = employee.ProfessionalProfile;
                    tblEmployee.EmploymentType = employee.EmploymentType;
                    tblEmployee.EducationQualification = employee.EducationQualification;
                    tblEmployee.IdentificationDocument = employee.IdentificationDocument;
                    tblEmployee.IdentificationNumber = employee.IdentificationNumber;
                    tblEmployee.IsActive = true;
                    tblEmployee.CreatedOn = DateTime.Now;
                    tblEmployee.CreatedBy = User.Identity.GetUserId();
                    tblEmployee.ResidentialAddress = employee.ResidentialAddress;
                    tblEmployee.PostalAddress = employee.PostalAddress;
                    db.tblEmployees.Add(tblEmployee);
                    int save = db.SaveChanges();
                }
                return Ok(new { Message = "SUCCESS", id = empId });
            }
            catch (DbUpdateException)
            {
                if (TblEmployeeExists(tblEmployee.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }
        }

        // DELETE: api/Employees/5
        public IHttpActionResult DeletetblEmployee(int id)
        {
            tblEmployee tblEmployee = db.tblEmployees.Find(id);
            if (tblEmployee == null)
            {
                return NotFound();
            }

            //db.tblEmployees.Remove(tblEmployee);
            db.SaveChanges();

            return Ok(new { Message = "SUCCESS" });
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

        private IEnumerable<object> GetEmployees()
        {
            return db.tblEmployees.Select(i => new
            {
                i.ID,
                i.FirstName,
                i.LastName,
                i.Email,
                Department = i.tblDepartment.Name,
                Location = i.tblDepartment.Location,
                i.JobTitle,
                i.JoiningDate,               
                i.EmploymentType
            });
        }
    }
}