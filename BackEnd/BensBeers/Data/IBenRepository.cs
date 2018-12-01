using System.Collections.Generic;
using BensBeers.Data.Entities;

namespace BensBeers.Data
{
    public interface IBenRepository
    {
        IEnumerable<Product> GetAllProducts();
        IEnumerable<Product> GetProductsByStyle(string style);
        void AddProduct(Product newProduct);


        IEnumerable<Order> GetAllOrders(bool includeItems);
        Order GetOrderById(string username, int id);
        IEnumerable<Order> GetAllOrdersByUser(string username, bool includeItems);
        void AddOrder(Order newOrder);
        void RegisterNewUser(BensBeersUser newUser);
        Order GetOrderByOrderNumber(string username, string ordernumber);

        bool SaveAll();
        void AddEntity(object model);


        IEnumerable<Brewery> GetAllBreweries();
    }
}