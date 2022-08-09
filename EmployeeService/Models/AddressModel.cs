using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EmployeeService.Models
{
    public class AddressModel
    {
        public Guid AddressId { get; set; }
        public string HouseNumber { get; set; }
        public string StreetAddress { get; set; }
        public string SuburbCity { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public DateTime? CreatedOn { get; set; }
        public UserInfoModel CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public UserInfoModel UpdatedBy { get; set; }
        public bool IsActive { get; set; }
        public bool IsPostalAddress { get; set; }
    }
}