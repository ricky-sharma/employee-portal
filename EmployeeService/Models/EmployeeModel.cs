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
       
        public string Department { get; set; }
        
        public string Location { get; set; }
        
        public string JobTitle { get; set; }
    }
}