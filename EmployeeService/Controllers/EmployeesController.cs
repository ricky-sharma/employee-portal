using Common.Library;
using EmployeeService.Models;
using Microsoft.AspNet.Identity;
using SQLDataEntity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Web.Hosting;
using System.Web.Http;
using System.Web.Http.Description;

namespace EmployeeService.Controllers
{
    [Authorize]
    public class EmployeesController : ApiController
    {
        private readonly EmployeeDBEntities db = new EmployeeDBEntities();
        private readonly string ImagePath = Path.GetFullPath(Path.Combine(HostingEnvironment.MapPath("~"), "../EmployeePortal/files/employeeImages/"));
        private string LockTransaction = "lockTransaction";

        // GET: api/Employees
        public IEnumerable<object> GettblEmployees()
        {
            try
            {
                return GetEmployees();
            }
            catch
            {
                throw;
            }
        }

        // GET: api/Employees/5
        [ResponseType(typeof(EmployeeModel))]
        public IHttpActionResult GettblEmployee(int id)
        {
            try
            {
                tblEmployee tblEmployee = db.tblEmployees.Find(id);
                if (tblEmployee == null)
                {
                    return NotFound();
                }

                var empImageMap = db.tblEmployeeImageMaps.Where(x => x.EmployeeId == id && x.Active).FirstOrDefault();
                var employeeImage = empImageMap != null && db.tblImages.Find(empImageMap.ImageId) != null ?
                    db.tblImages.Find(empImageMap.ImageId).Name : string.Empty;

                var employee = new
                {
                    tblEmployee.Department,
                    tblEmployee.ID,
                    tblEmployee.FirstName,
                    tblEmployee.LastName,
                    tblEmployee.Gender,
                    tblEmployee.Salary,
                    tblEmployee.JobTitle,
                    tblEmployee.JoiningDate,
                    tblEmployee.LeavingDate,
                    tblEmployee.DateofBirth,
                    tblEmployee.Mobile,
                    tblEmployee.HomePhone,
                    tblEmployee.Email,
                    tblEmployee.ProfessionalProfile,
                    tblEmployee.EmploymentType,
                    tblEmployee.EducationQualification,
                    tblEmployee.IdentificationDocument,
                    tblEmployee.IdentificationNumber,
                    ResidentialAddress = tblEmployee.ResidentialAddress != null ? (Guid)tblEmployee.ResidentialAddress : Guid.Empty,
                    PostalAddress = tblEmployee.PostalAddress != null ? (Guid)tblEmployee.PostalAddress : Guid.Empty,
                    EmployeeImage = !string.IsNullOrEmpty(employeeImage) ? employeeImage : null,
                    tblEmployee.EmployeeID
                };

                return Ok(employee);
            }
            catch
            {
                throw;
            }
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
                using (var txn = db.Database.BeginTransaction())
                {
                    try
                    {
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

                        if (!SaveImage(id, employee.EmployeeImage))
                        {
                            return BadRequest("Invalid Image!");
                        }

                        txn.Commit();
                        return Ok(new { Message = "SUCCESS" });
                    }
                    catch
                    {
                        txn.Rollback();
                        return BadRequest("Data transaction failed!");
                    }
                }
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

                using (var txn = db.Database.BeginTransaction())
                {
                    try
                    {
                        lock (LockTransaction)
                        {
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
                            tblEmployee.EmployeeID = "0";
                            db.tblEmployees.Add(tblEmployee);
                            db.SaveChanges();
                            tblEmployee.EmployeeID = $"E{tblEmployee.ID:000000}";
                            db.Entry(tblEmployee).State = EntityState.Modified;
                            db.SaveChanges();

                            if (!SaveImage(tblEmployee.ID, employee.EmployeeImage))
                            {
                                return BadRequest("Invalid Image!");
                            }
                        }
                        txn.Commit();
                        return Ok(new { Message = "SUCCESS", id = tblEmployee.ID });
                    }
                    catch
                    {
                        txn.Rollback();
                        return BadRequest("Data transaction failed!");
                    }
                }
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
            return db.tblEmployees.AsEnumerable().Select(i =>
            {
                var empImageMap = db.tblEmployeeImageMaps.Where(x => x.EmployeeId == i.ID && x.Active).FirstOrDefault();
                var employeeImage = empImageMap != null && db.tblImages.Find(empImageMap.ImageId) != null ?
                   db.tblImages.Find(empImageMap.ImageId).Name : string.Empty;
                return new
                {
                    i.ID,
                    i.EmployeeID,
                    i.FirstName,
                    i.LastName,
                    i.Email,
                    Department = i.tblDepartment.Name,
                    i.tblDepartment.Location,
                    i.JobTitle,
                    i.JoiningDate,
                    i.EmploymentType,
                    EmployeeImage = !string.IsNullOrEmpty(employeeImage) ? employeeImage : null,
                };
            });
        }

        private bool SaveImage(int id, ImageModel imageModel)
        {
            if (imageModel.IsChanged)
            {
                var tImage = db.tblEmployeeImageMaps.Where(x => x.EmployeeId == id && x.Active);
                if (tImage.Any())
                {
                    foreach (var imgMap in tImage)
                    {
                        imgMap.Active = false;
                        db.Entry(imgMap).State = EntityState.Modified;
                        db.SaveChanges();
                    }
                }
                if (!string.IsNullOrEmpty(imageModel.Src) && !string.IsNullOrEmpty(imageModel.UploadedName)
                                        && !string.IsNullOrEmpty(imageModel.Type))
                {
                    var imageId = Guid.NewGuid();
                    var imageName = $"{imageId}-{imageModel.UploadedName}";
                    var imagePath = $"{ImagePath}{imageName}";
                    if (!BaseHelper.ValidateImage(imageModel.Src) ||
                                !BaseHelper.SaveImage(imageModel.Src, imagePath))
                    {
                        return false;
                    }

                    tblImage image = new tblImage
                    {
                        ID = imageId,
                        Name = imageName,
                        Type = imageModel.Type,
                        Path = imagePath,
                        UploadedName = imageModel.UploadedName,
                        CreatedOn = DateTime.Now,
                        CreatedBy = User.Identity.GetUserId()
                    };
                    db.tblImages.Add(image);
                    db.SaveChanges();
                    tblEmployeeImageMap employeeImageMap = new tblEmployeeImageMap
                    {
                        Active = true,
                        EmployeeId = id,
                        ImageId = imageId,
                        ID = Guid.NewGuid()
                    };
                    db.tblEmployeeImageMaps.Add(employeeImageMap);
                    db.SaveChanges();
                }
            }
            return true;
        }
    }
}