using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BensBeers.Data;
using BensBeers.Data.Entities;
using BensBeers.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
// TO DO - VERIFICATION, DELETE, UPDATE
namespace BensBeers.Controllers
{
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IBenRepository _repository;
        private readonly ILogger<OrdersController> _logger;
        private readonly IMapper _mapper;
        private readonly UserManager<BensBeersUser> _usermanager;

        public OrdersController(IBenRepository repository,
            ILogger<OrdersController> logger,
            IMapper mapper,
            UserManager<BensBeersUser> userManager)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
            _usermanager = userManager;
        }

        [HttpGet]
        public IActionResult Get(bool includeItems = true)
        {
            try
            {
                var username = User.Identity.Name;

                var results = _repository.GetAllOrdersByUser(username, includeItems);
                return Ok(_mapper.Map<IEnumerable<Order>, IEnumerable<OrderViewModel>>(results));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get orders: {ex}");
                return BadRequest("Failed to get Orders");
            }
        }

        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            try
            {
                var order = _repository.GetOrderById(User.Identity.Name, id);

                if (order != null) return Ok(_mapper.Map<Order, OrderViewModel>(order));
                else return NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get orders: {ex}");
                return BadRequest("Failed to get Orders");
            }
        }

        [HttpGet("{ordernumber}")]
        public IActionResult Get(string ordernumber)
        {
            try
            {
                var order = _repository.GetOrderByOrderNumber(User.Identity.Name, ordernumber);

                if (order != null) return Ok(_mapper.Map<Order, OrderViewModel>(order));
                else return NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get orders: {ex}");
                return BadRequest("Failed to get Orders");
            }
        }

        [HttpPost]
        public async  Task<IActionResult> Post([FromBody]OrderViewModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newOrder = _mapper.Map<OrderViewModel, Order>(model);

                    if (newOrder.OrderDate == DateTime.MinValue)
                    {
                        newOrder.OrderDate = DateTime.Now;
                    }

                    var currentUser = await _usermanager.FindByNameAsync(User.Identity.Name);
                    newOrder.User = currentUser;

                    _repository.AddOrder(newOrder);

                    if (_repository.SaveAll())
                    { 
                        return Created($"/api/orders/{newOrder.Id})", _mapper.Map<Order, OrderViewModel>(newOrder));
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