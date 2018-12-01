using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BensBeers.Data;
using BensBeers.Data.Entities;
using Microsoft.Extensions.Logging;
using BensBeers.ViewModels;
using AutoMapper;
//TO DO - VERIFICATION, UPDATE, DELETE
namespace BensBeers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class ProductsController : ControllerBase
    {
        private readonly IBenRepository _repository;
        private readonly ILogger<ProductsController> _logger;
        private readonly IMapper _mapper;

        public ProductsController(IBenRepository repository, ILogger<ProductsController> logger, IMapper mapper)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<IEnumerable<Product>> Get()
        {
            try
            {
                return Ok(_repository.GetAllProducts());
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get products: {ex}");
                return BadRequest("Faled to get products");
            }
        }


        [HttpPost]
        public IActionResult Post([FromBody]ProductViewModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newProduct = _mapper.Map<ProductViewModel, Product>(model);


                    _repository.AddProduct(newProduct);

                    if (_repository.SaveAll())
                    {
                        return Created($"/api/products/{newProduct.Id})", _mapper.Map<Product, ProductViewModel>(newProduct));
                    }
                }
                else
                {
                    return BadRequest(ModelState);
                }

            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to save a new order: {ex}");

            }

            return BadRequest("Failed to save a new order");
        }

    }
}