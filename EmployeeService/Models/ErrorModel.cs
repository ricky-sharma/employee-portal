using SQLDataEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EmployeeService.Models
{
    public class ErrorModel
    {
        public Guid ID { get; set; }
        public string Error { get; set; }
        public string ErrorInfo { get; set; }
        public DateTime CreatedOn { get; set; }
        public AspNetUser User { get; set; }
        public string ErrorCode { get; set; }
    }
}