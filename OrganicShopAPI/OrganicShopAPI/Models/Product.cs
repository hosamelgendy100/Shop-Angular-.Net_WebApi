using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OrganicShopAPI.Models
{
    public class Product
    {
        public int ProductId { get; set; }

        public string ProductName { get; set; }

        public decimal Price { get; set; }

        public string Category { get; set; }

        public string ImageURL { get; set; }
    }
}