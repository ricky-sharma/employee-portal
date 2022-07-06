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
using SQLDataEntity;

namespace EmployeeService.Controllers
{
    public class LoggerController : ApiController
    {
        private EmployeeDBEntities db = new EmployeeDBEntities();

        // GET: api/Logger
        public IQueryable<tblLog> GettblLogs()
        {
            return db.tblLogs;
        }

        // GET: api/Logger/5
        [ResponseType(typeof(tblLog))]
        public async Task<IHttpActionResult> GettblLog(Guid id)
        {
            tblLog tblLog = await db.tblLogs.FindAsync(id);
            if (tblLog == null)
            {
                return NotFound();
            }

            return Ok(tblLog);
        }

        // POST: api/Logger
        [ResponseType(typeof(tblLog))]
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
                UserId = logModel.UserId ?? string.Empty
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