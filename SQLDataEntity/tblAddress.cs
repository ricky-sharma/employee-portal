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
    
    public partial class tblAddress
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tblAddress()
        {
            this.tblEmployees = new HashSet<tblEmployee>();
            this.tblEmployees1 = new HashSet<tblEmployee>();
            this.tblDepartments = new HashSet<tblDepartment>();
            this.tblDepartments1 = new HashSet<tblDepartment>();
        }
    
        public System.Guid AddressId { get; set; }
        public string HouseNumber { get; set; }
        public string StreetAddress { get; set; }
        public string SuburbCity { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public Nullable<System.DateTime> CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedOn { get; set; }
        public string UpdateBy { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsPostalAddress { get; set; }
    
        public virtual AspNetUser AspNetUser { get; set; }
        public virtual AspNetUser AspNetUser1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblEmployee> tblEmployees { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblEmployee> tblEmployees1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblDepartment> tblDepartments { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblDepartment> tblDepartments1 { get; set; }
    }
}
