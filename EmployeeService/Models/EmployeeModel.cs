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
        public int Department { get; set; }
        public DateTime? JoiningDate { get; set; }
        public DateTime? LeavingDate { get; set; }
        public string JobTitle { get; set; }
        public string DateofBirth { get; set; }
        public string Mobile { get; set; }
        public string HomePhone { get; set; }
        public string Email { get; set; }
        public string ProfessionalProfile { get; set; }
        public string EmploymentType { get; set; }
        public string EducationQualification { get; set; }
        public string IdentificationDocument { get; set; }
        public string IdentificationNumber { get; set; }
        public Guid ResidentialAddress { get; set; }
        public Guid PostalAddress { get; set; }
        public ImageModel EmployeeImage { get; set; }
    }
}