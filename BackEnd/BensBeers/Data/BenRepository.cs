using BensBeers.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace BensBeers.Data
{
    public class BenRepository : IBenRepository
    {
        private readonly BenContext _ctx;

        public BenRepository(BenContext ctx)
        {
            _ctx = ctx;
        }

        public void AddEntity(object model)
        {
            _ctx.Add(model);
        }

        public IEnumerable<Order> GetAllOrders(bool includeItems)
        {
            if (includeItems)
            {
                return _ctx.Orders
                .Include(o => o.Items)
                .ThenInclude(i => i.Beer)
                .ToList();
            }
            else
            {
                return _ctx.Orders
                .ToList();
            }
            
        }

        public IEnumerable<Order> GetAllOrdersByUser(string username, bool includeItems)
        {
            if (includeItems)
            {
                return _ctx.Orders
                .Where( o => o.User.UserName == username)
                .Include(o => o.Items)
                .ThenInclude(i => i.Beer)
                .ThenInclude(b => b.Brewery)
                .ToList();
            }
            else
            {
                return _ctx.Orders
                .Where(o => o.User.UserName == username)
                .ToList();
            }
        }

        public IEnumerable<Product> GetAllProducts()
        {
            return _ctx.Products
                .Include(b => b.Brewery)
                .OrderBy(b => b.Brewery)
                .ToList();
        }

        public Order GetOrderById(string username, int id)
        {
            return _ctx.Orders
                .Include(o => o.Items)
                .ThenInclude(i => i.Beer)
                .ThenInclude(b => b.Brewery)
                .Where(o => o.Id == id && o.User.UserName == username)
                .FirstOrDefault();
        }

        public IEnumerable<Product> GetProductsByStyle(string style)
        {
            return _ctx.Products
                .Where(p => p.Style == style)
                .ToList();
        }

        public bool SaveAll()
        {
            return _ctx.SaveChanges() > 0;
        }
    }
}
