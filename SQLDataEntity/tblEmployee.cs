//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SQLDataEntity
{
    using System;
    using System.Collections.Generic;
    
    public partial class tblEmployee
    {
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public int Salary { get; set; }
        public int DepartmentId { get; set; }
        public string JobTitle { get; set; }
        public System.DateTime JoiningDate { get; set; }
        public bool InService { get; set; }
        public Nullable<System.DateTime> LeavingDate { get; set; }
    
        public virtual tblDepartment tblDepartment { get; set; }
    }
}
