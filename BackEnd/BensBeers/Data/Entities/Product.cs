using System;
using System.Collections.Generic;
using System.Text;

namespace BensBeers.Data.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string BeerName { get; set; }
        public string Style { get; set; }
        public decimal ABV { get; set; }
        public int Size { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }      
        public string ImageLink { get; set; }
        public Brewery Brewery { get; set; }
    }
}
