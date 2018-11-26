using System;
using System.Collections.Generic;
using System.Text;

namespace BensBeers.Data.Entities
{
    public class OrderItem
    {
        public int Id { get; set; }
        public Product Beer { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public Order Order { get; set; }
    }
}
