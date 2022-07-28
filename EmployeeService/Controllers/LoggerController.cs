using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using EmployeeService.Models;
using Microsoft.AspNet.Identity;
using SQLDataEntity;

namespace EmployeeService.Controllers
{
    [Authorize]
    public class LoggerController : ApiController
    {
        private EmployeeDBEntities db = new EmployeeDBEntities();

        // GET: api/Logger
        public List<LogModel> GettblLogs()
        {
            var tbllogs = db.tblLogs;
            var logs = tbllogs?.Any() == true ? tbllogs?.OrderByDescending(x => x.CreatedOn).ToList().Select(i => new LogModel()
            {
                CreatedOn = i != null ? i.CreatedOn : null,
                User = i != null ? new UserInfoModel
                {
                    FirstName = i.AspNetUser?.AspNetUserInfoes?.FirstOrDefault()?.FirstName ?? "",
                    LastName = i.AspNetUser?.AspNetUserInfoes?.FirstOrDefault()?.LastName ?? ""
                } : null,
                LogMessage = i != null ? i.LogMessage : null,
                Type = i != null ? i.Type : null,
                ID = i != null ? i.ID : default
            }).ToList() : null;
            return logs;
        }

        // GET: api/Logger/5
        [ResponseType(typeof(LogModel))]
        public async Task<IHttpActionResult> GettblLog(Guid id)
        {
            tblLog tblLog = await db.tblLogs.FindAsync(id);
            if (tblLog == null)
            {
                return NotFound();
            }

            var logModel = new LogModel()
            {
                CreatedOn = (DateTime)tblLog.CreatedOn,
                User = db.AspNetUserInfoes.Where(u => u.UsersId == tblLog.UserId).Select(k => new UserInfoModel
                {
                    userInfoViewModel = new UserInfoViewModel()
                    {
                        UserId = k.UsersId
                    },
                    FirstName = k.FirstName,
                    LastName = k.LastName,
                    UserId = k.UsersId
                }).FirstOrDefault(),
                LogMessage = tblLog.LogMessage,
                Type = tblLog.Type,
                ID = tblLog.ID
            };

            return Ok(logModel);
        }

        // POST: api/Logger
        public async Task<IHttpActionResult> PosttblLog(LogModel logModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tblLog = new tblLog
            {
                ID = Guid.NewGuid(),
                CreatedOn = DateTime.Now,
                LogMessage = logModel.LogMessage ?? string.Empty,
                Type = logModel.Type ?? string.Empty,
                UserId = User.Identity.GetUserId() ?? string.Empty
            };
            db.tblLogs.Add(tblLog);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (tblLogExists(tblLog.ID))
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

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tblLogExists(Guid id)
        {
            return db.tblLogs.Count(e => e.ID == id) > 0;
        }
    }
}