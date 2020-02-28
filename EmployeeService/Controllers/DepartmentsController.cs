using System;
using System.Collections.Generic;
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
    public class DepartmentsController : ApiController
    {
        private readonly EmployeeDBEntities db = new EmployeeDBEntities();

        // GET: api/Departments
        public IQueryable<DepartmentModel> GettblDepartments()
        {
            return GetDepartments();
        }

        // GET: api/Departments/5
        [ResponseType(typeof(DepartmentModel))]
        public IHttpActionResult GettblDepartment(int id)
        {
            DepartmentModel department = GetDepartments().FirstOrDefault(i => i.ID == id);            
            if (department == null)
            {
                return NotFound();
            }

            return Ok(department);
        }

        // PUT: api/Departments/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PuttblDepartment(int id, DepartmentModel department)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != department.ID)
            {
                return BadRequest();
            }

            tblDepartment tblDepartment = new tblDepartment()
            {
                ID = department.ID,
                Name = department.Name,
                Location = department.Location
            };

            db.Entry(tblDepartment).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
                return Ok(new { Message = "SUCCESS" });
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tblDepartmentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
        }

        // POST: api/Departments
        [ResponseType(typeof(DepartmentModel))]
        public IHttpActionResult PosttblDepartment(DepartmentModel department)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            object Lock = new object();
            int depId = 0;
            lock (Lock)
            {
                depId = db.tblDepartments.Select(i => i.ID).DefaultIfEmpty(0).Max();
                department.ID = depId;
                tblDepartment tblDepartment = new tblDepartment()
                {
                    ID = department.ID,
                    Name = department.Name,
                    Location = department.Location
                };

                db.tblDepartments.Add(tblDepartment);
                int save = db.SaveChanges();
            }

            return CreatedAtRoute("DefaultApi", new { id = depId }, department);
        }

        // DELETE: api/Departments/5
        [ResponseType(typeof(tblDepartment))]
        public IHttpActionResult DeletetblDepartment(int id)
        {
            tblDepartment tblDepartment = db.tblDepartments.Find(id);
            if (tblDepartment == null)
            {
                return NotFound();
            }

            db.tblDepartments.Remove(tblDepartment);
            db.SaveChanges();

            return Ok(tblDepartment);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tblDepartmentExists(int id)
        {
            return db.tblDepartments.Count(e => e.ID == id) > 0;
        }

        private IQueryable<DepartmentModel> GetDepartments()
        {
            return db.tblDepartments.Select(i => new DepartmentModel()
            {
                ID = i.ID,
                Name = i.Name,
                Location = i.Location,
            });
        }
    }
}