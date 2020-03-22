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
       
        // GET: api/AspNetUserInfoes/5
        [ResponseType(typeof(UserInfoModel))]
        public IHttpActionResult GetAspNetUserInfo(string UserId)
        {
            UserInfoModel userInfo = GetUserInfoes().FirstOrDefault(i => i.UsersId == UserId);           
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
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != userInfoModel.UsersId)
            {
                return BadRequest();
            }

            AspNetUserInfo aspNetUserInfo = new AspNetUserInfo()
            {
                Id = userInfoModel.Id,                
                FirstName = userInfoModel.FirstName,
                LastName = userInfoModel.LastName,
                Gender = userInfoModel.Gender,
                DOB = userInfoModel.DOB,
                UsersId = userInfoModel.UsersId
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
        public IHttpActionResult PostAspNetUserInfo(AspNetUserInfo aspNetUserInfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

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

            return CreatedAtRoute("DefaultApi", new { id = aspNetUserInfo.Id }, aspNetUserInfo);
        }

        // DELETE: api/AspNetUserInfoes/5
        [ResponseType(typeof(AspNetUserInfo))]
        public IHttpActionResult DeleteAspNetUserInfo(string id)
        {
            AspNetUserInfo aspNetUserInfo = db.AspNetUserInfoes.Find(id);
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
            return db.AspNetUserInfoes.Select(i => new UserInfoModel()
            {
                Id = i.Id,
                DOB = i.DOB,
                UsersId = i.UsersId,
                FirstName = i.FirstName,
                LastName = i.LastName,
                Gender = i.Gender
            });
        }
    }
}