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
    public class AspNetUserInfoesController : ApiController
    {
        private EmployeeDBEntities db = new EmployeeDBEntities();

        // GET: api/AspNetUserInfoes
        public IQueryable<UserInfoModel> GetAspNetUserInfoes()
        {
            return GetUserInfoes();
        }
       
        // GET: api/AspNetUserInfoes/id
        [ResponseType(typeof(UserInfoModel))]
        public IHttpActionResult GetAspNetUserInfo(string id)
        {
            var getUserInfoes = GetUserInfoes();
            UserInfoModel userInfo = getUserInfoes?.Any() == true ? getUserInfoes?.FirstOrDefault(i => i.UserId == id): null;
            if (userInfo == null)
            {
                return NotFound();
            }

            return Ok(userInfo);
        }

        // PUT: api/AspNetUserInfoes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAspNetUserInfo(string id, UserInfoModel userInfoModel)
        {
            ModelState.Where(m => m.Key == "userInfoModel.userInfoViewModel.Password")?.FirstOrDefault().Value.Errors.Clear();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != userInfoModel.UserId)
            {
                return BadRequest();
            }

            AspNetUserInfo aspNetUserInfo = new AspNetUserInfo()
            {
                Id = userInfoModel.Id.ToString(),
                FirstName = userInfoModel.FirstName,
                LastName = userInfoModel.LastName,
                Gender = userInfoModel.Gender,
                DOB = userInfoModel.DOB,
                UsersId = userInfoModel.UserId
            };

            AspNetUser aspNetUser = new AspNetUser()
            {
                Email = userInfoModel.userInfoViewModel.Email,
                EmailConfirmed = userInfoModel.userInfoViewModel.Email == userInfoModel.userInfoViewModel.ConfirmEmail ? true : false,
                PhoneNumber = userInfoModel.userInfoViewModel.Phone,
                PhoneNumberConfirmed = userInfoModel.userInfoViewModel.Phone == userInfoModel.userInfoViewModel.ConfirmPhone ? true : false,
                Id = userInfoModel.userInfoViewModel.UserId,
                UserName = userInfoModel.userInfoViewModel.UserName,
                PasswordHash = ((AspNetUser)db.AspNetUsers.AsNoTracking().Where(i => i.Id == userInfoModel.userInfoViewModel.UserId).FirstOrDefault()).PasswordHash,
                SecurityStamp = ((AspNetUser)db.AspNetUsers.AsNoTracking().Where(i => i.Id == userInfoModel.userInfoViewModel.UserId).FirstOrDefault()).SecurityStamp
            };
                       
            db.Entry(aspNetUserInfo).State = EntityState.Modified;
            db.Entry(aspNetUser).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AspNetUserInfoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }

            return Ok(new { Message = "SUCCESS" });
        }

        // POST: api/AspNetUserInfoes
        [ResponseType(typeof(AspNetUserInfo))]
        public IHttpActionResult PostAspNetUserInfo(UserInfoModel userInfoModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            AspNetUserInfo aspNetUserInfo = new AspNetUserInfo()
            {
                Id= Guid.NewGuid().ToString(),
                FirstName = userInfoModel.FirstName,
                LastName = userInfoModel.LastName,
                Gender = userInfoModel.Gender,
                DOB = userInfoModel.DOB,
                UsersId = db.AspNetUsers?.FirstOrDefault(i => i.UserName == userInfoModel.userInfoViewModel.UserName).Id
            };

            db.AspNetUserInfoes.Add(aspNetUserInfo);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (AspNetUserInfoExists(aspNetUserInfo.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Ok(new { Message = "SUCCESS" });
        }

        // DELETE: api/AspNetUserInfoes/5
        [ResponseType(typeof(AspNetUserInfo))]
        public IHttpActionResult DeleteAspNetUserInfo(string id)
        {
            AspNetUserInfo aspNetUserInfo = db.AspNetUserInfoes?.Find(id);
            if (aspNetUserInfo == null)
            {
                return NotFound();
            }

            db.AspNetUserInfoes.Remove(aspNetUserInfo);
            db.SaveChanges();

            return Ok(aspNetUserInfo);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AspNetUserInfoExists(string id)
        {
            return db.AspNetUserInfoes.Count(e => e.Id == id) > 0;
        }

        private IQueryable<UserInfoModel> GetUserInfoes()
        {
            return db.AspNetUserInfoes?.Any() == true ? db.AspNetUserInfoes?.Select(i => new UserInfoModel()
            {
                Id = i !=null ? i.Id : "",
                Email = i != null ? i.AspNetUser.Email : "",
                DOB = i != null ? i.DOB : null,
                UserId = i != null ? i.UsersId : "",
                FirstName = i != null ? i.FirstName : "",
                LastName = i != null ? i.LastName : "",
                Gender = i != null ? i.Gender : ""
            }) : null;
        }
    }
}