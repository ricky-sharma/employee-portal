using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Serialization;

namespace EmployeeService.Models
{
    public class EmployeeModel
    {
        public int ID { get; set; }
        
        public string FirstName { get; set; }
       
        public string LastName { get; set; }
        
        public string Gender { get; set; }
        
        public int Salary { get; set; }

        public int DepartmentId { get; set; }

        public string DepartmentName { get; set; }        
        
        public string DepartmentLocation { get; set; }
        
        public string JobTitle { get; set; }
    }
}