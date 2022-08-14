using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EmployeeService.Models
{
    public class ImageModel
    {
        public string Src { get; set; }
        public string Type { get; set; }
        public string UploadedName { get; set; }
        public bool IsChanged { get; set; }

    }
}