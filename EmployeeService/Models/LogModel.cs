using SQLDataEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EmployeeService.Models
{
    public class LogModel
    {
        public Guid ID { get; set; }
        public string Type { get; set; }
        public UserInfoModel User { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string LogMessage { get; set; }
    }
}