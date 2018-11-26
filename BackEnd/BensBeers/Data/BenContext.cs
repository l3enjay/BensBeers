using BensBeers.Data.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace BensBeers.Data
{
    public class BenContext : IdentityDbContext<BensBeersUser>
    {
        public BenContext(DbContextOptions<BenContext> options): base (options)
        {
        }


        public DbSet<Product> Products {get; set;}
        public DbSet<Brewery> Breweries { get; set; }
        public DbSet<Order> Orders { get; set; }

    }
}
