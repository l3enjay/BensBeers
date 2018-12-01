using BensBeers.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BensBeers.ViewModels
{
    public class ProductViewModel
    {
        public int Id { get; set; }
        [Required]
        public string BeerName { get; set; }
        public string Style { get; set; }
        [Required]
        public decimal ABV { get; set; }
        [Required]
        public int Size { get; set; }
        [Required]
        public decimal Price { get; set; }
        public string Description { get; set; }
        public string ImageLink { get; set; }


        public int BreweryId { get; set; }
        public string BreweryName { get; set; }
        public string BreweryLocation { get; set; }
        public string BreweryDescription { get; set; }
        public string BreweryImageLink { get; set; }

    }
}
