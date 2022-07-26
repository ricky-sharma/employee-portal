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
using Common.Library;

namespace EmployeeService.Controllers
{
    [Authorize]
    public class ErrorController : ApiController
    {
        private EmployeeDBEntities db = new EmployeeDBEntities();

        // GET: api/Error
        public IQueryable<tblError> GettblErrors()
        {
            return db.tblErrors;
        }

        // GET: api/Error/5
        [ResponseType(typeof(tblError))]
        public async Task<IHttpActionResult> GettblError(Guid id)
        {
            tblError tblError = await db.tblErrors.FindAsync(id);
            if (tblError == null)
            {
                return NotFound();
            }

            return Ok(tblError);
        }

        // PUT: api/Error/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PuttblError(Guid id, tblError tblError)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tblError.ID)
            {
                return BadRequest();
            }

            db.Entry(tblError).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tblErrorExists(id))
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

        // POST: api/Error
        public async Task<IHttpActionResult> PosttblError(ErrorModel errorModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var errorCode = db.tblErrors.Any() ? (db.tblErrors.ToList().Select(x => int.Parse(x.ErrorCode)).ToList().Max() + 1) : 100001;

            var tblError = new tblError()
            {
                ID = Guid.NewGuid(),
                CreatedOn = DateTime.Now,
                Error = errorModel.Error,
                ErrorInfo = errorModel.ErrorInfo,
                ErrorCode = errorCode.ToString(),
                UserId = User.Identity.GetUserId()
            };

            db.tblErrors.Add(tblError);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (tblErrorExists(errorModel.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Ok(new { Message = "SUCCESS", ErrorCode = tblError.ErrorCode });
        }

        // DELETE: api/Error/5
        [ResponseType(typeof(tblError))]
        public async Task<IHttpActionResult> DeletetblError(Guid id)
        {
            tblError tblError = await db.tblErrors.FindAsync(id);
            if (tblError == null)
            {
                return NotFound();
            }

            db.tblErrors.Remove(tblError);
            await db.SaveChangesAsync();

            return Ok(tblError);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tblErrorExists(Guid id)
        {
            return db.tblErrors.Count(e => e.ID == id) > 0;
        }
    }
}