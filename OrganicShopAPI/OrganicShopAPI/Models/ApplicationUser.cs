using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace OrganicShopAPI.Models
{
    public class ApplicationUser:IdentityUser
    {
    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Product> ProductDetails { get; set; }

        public DbSet<Category> CategoryDetails { get; set; }

        
    }
}