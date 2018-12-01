using AutoMapper;
using BensBeers.Data;
using BensBeers.Data.Entities;
using BensBeers.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BensBeers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class BreweriesController: Controller
    {

        private readonly IBenRepository _repository;
        private readonly ILogger<BreweriesController> _logger;
        private readonly IMapper _mapper;

        public BreweriesController(IBenRepository repository, ILogger<BreweriesController> logger, IMapper mapper)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
        }
        [HttpGet]
        public ActionResult<IEnumerable<Product>>Get()
        {
            try
            {
                var results = _repository.GetAllBreweries();
                return Ok(_mapper.Map<IEnumerable<Brewery>, IEnumerable<BreweryViewModel>>(results));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get products: {ex}");
                return BadRequest("Faled to get products");
            }
        }
    }
}
