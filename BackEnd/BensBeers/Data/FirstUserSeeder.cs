using BensBeers.Data.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BensBeers.Data
{
    public class FirstUserSeeder
    {
        private readonly BenContext _ctx;
        private readonly IHostingEnvironment _hosting;
        private readonly UserManager<BensBeersUser> _usermanager;

        public FirstUserSeeder(BenContext ctx, IHostingEnvironment hosting, UserManager<BensBeersUser> userManager)
        {
            _ctx = ctx;
            _hosting = hosting;
            _usermanager = userManager;
        }

        public async Task SeedASync()
        {
            _ctx.Database.EnsureCreated();

            BensBeersUser user = await _usermanager.FindByEmailAsync("byounger22@gmail.com");
            if (user == null)
            {
                user = new BensBeersUser()
                {
                    FirstName = "Ben",
                    LastName = "Younger",
                    Email = "byounger22@gmail.com",
                    UserName = "byounger22@gmail.com"
                };

                var result = await _usermanager.CreateAsync(user, "P@ssw0rd!");
                if (result != IdentityResult.Success)
                {
                    throw new InvalidOperationException("Could not create new user in seeder");
                }
            }


            _ctx.SaveChanges();
        }
    }
}
