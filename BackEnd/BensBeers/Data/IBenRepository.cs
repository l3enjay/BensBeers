using System.Collections.Generic;
using BensBeers.Data.Entities;

namespace BensBeers.Data
{
    public interface IBenRepository
    {
        IEnumerable<Product> GetAllProducts();
        IEnumerable<Product> GetProductsByStyle(string style);

        IEnumerable<Order> GetAllOrders(bool includeItems);
        Order GetOrderById(string username, int id);
        IEnumerable<Order> GetAllOrdersByUser(string username, bool includeItems);


        bool SaveAll();
        void AddEntity(object model);
    }
}