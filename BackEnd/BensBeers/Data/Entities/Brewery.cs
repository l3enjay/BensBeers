using System;
using System.Collections.Generic;
using System.Text;

namespace BensBeers.Data.Entities
{
    public class Brewery
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public string ImageLink { get; set; }
        public ICollection<Product> Beers { get; set; }
    }
}
