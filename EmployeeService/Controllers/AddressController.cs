using EmployeeService.Models;
using Microsoft.AspNet.Identity;
using SQLDataEntity;
using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace EmployeeService.Controllers
{
    [Authorize]
    public class AddressController : ApiController
    {
        private EmployeeDBEntities db = new EmployeeDBEntities();

        // GET: api/Address
        public IQueryable<AddressModel> GettblAddresses()
        {
            return db.tblAddresses.Select(i=> new AddressModel
            {
                AddressId = i.AddressId,
                HouseNumber = i.HouseNumber,
                StreetAddress = i.StreetAddress,
                SuburbCity = i.SuburbCity,
                State = i.State,
                PostalCode = i.PostalCode
            });
        }

        // GET: api/Address/5
        public async Task<IHttpActionResult> GettblAddress(Guid id)
        {
            var tblAddress = await db.tblAddresses.FindAsync(id);
            if (tblAddress == null)
            {
                return NotFound();
            }
            var address = new AddressModel
            {
                AddressId = id,
                HouseNumber = tblAddress.HouseNumber,
                StreetAddress = tblAddress.StreetAddress,
                SuburbCity = tblAddress.SuburbCity,
                State = tblAddress.State,
                PostalCode = tblAddress.PostalCode
            };

            return Ok(address);
        }

        // PUT: api/Address/5
        public async Task<IHttpActionResult> PuttblAddress(Guid id, AddressModel address)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                if (id != address.AddressId)
                {
                    return BadRequest();
                }
                var tAddress = db.tblAddresses.Find(id);
                tAddress.AddressId = id;
                tAddress.HouseNumber = address.HouseNumber;
                tAddress.StreetAddress = address.StreetAddress;
                tAddress.SuburbCity = address.SuburbCity;
                tAddress.State = address.State;
                tAddress.PostalCode = address.PostalCode;
                tAddress.UpdateBy = User.Identity.GetUserId();
                tAddress.UpdatedOn = DateTime.Now;
                tAddress.IsPostalAddress = address.IsPostalAddress;
                tAddress.IsActive = true;
                db.Entry(tAddress).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return Ok(new { Message = "SUCCESS" });
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tblAddressExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
        }

        // POST: api/Address
        public async Task<IHttpActionResult> PosttblAddress(AddressModel address)
        {
            tblAddress tblAddress = new tblAddress();
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                tblAddress.AddressId = Guid.NewGuid();
                tblAddress.HouseNumber = address.HouseNumber;
                tblAddress.StreetAddress = address.StreetAddress;
                tblAddress.SuburbCity = address.SuburbCity;
                tblAddress.State = address.State;
                tblAddress.PostalCode = address.PostalCode;
                tblAddress.CreatedBy = User.Identity.GetUserId();
                tblAddress.CreatedOn = DateTime.Now;
                tblAddress.IsPostalAddress = address.IsPostalAddress;
                tblAddress.IsActive = true;
                db.tblAddresses.Add(tblAddress);
                await db.SaveChangesAsync();
                return Ok(new { Message = "SUCCESS", id = tblAddress.AddressId });
            }
            catch (DbUpdateException)
            {
                if (tblAddressExists(tblAddress.AddressId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }
        }

        // DELETE: api/Address/5
        public async Task<IHttpActionResult> DeletetblAddress(Guid id)
        {
            var tblAddress = await db.tblAddresses.FindAsync(id);
            if (tblAddress == null)
            {
                return NotFound();
            }

            //db.tblAddresses.Remove(tblAddress);
            await db.SaveChangesAsync();

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

        private bool tblAddressExists(Guid id)
        {
            return db.tblAddresses.Count(e => e.AddressId == id) > 0;
        }
    }
}