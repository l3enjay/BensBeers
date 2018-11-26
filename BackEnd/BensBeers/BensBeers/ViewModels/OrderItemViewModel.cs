using BensBeers.Data.Entities;
using System.ComponentModel.DataAnnotations;

namespace BensBeers.ViewModels
{
    public class OrderItemViewModel
    {
        public int Id { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        public decimal UnitPrice { get; set; }

        [Required]
        public int BeerId { get; set; }

        public string BeerName { get; set; }
        public int BeerSize { get; set; }
        public int BeerAbv { get; set; }
        public string BeerImageLink { get; set; }
        public Brewery BeerBrewery { get; set; }
    }
}