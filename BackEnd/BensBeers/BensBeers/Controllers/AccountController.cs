using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BensBeers.Data;
using BensBeers.Data.Entities;
using BensBeers.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace BensBeers.Controllers
{

    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly ILogger<AccountController> _logger;
        private readonly SignInManager<BensBeersUser> _signinmanager;
        private readonly UserManager<BensBeersUser> _usermanager;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly IBenRepository _repository;

        public AccountController(ILogger<AccountController> logger,
            SignInManager<BensBeersUser> signInManager,
            UserManager<BensBeersUser> userManager,
            IConfiguration config,
            IMapper mapper,
            IBenRepository repository)
        {
            _logger = logger;
            _signinmanager = signInManager;
            _usermanager = userManager;
            _config = config;
            _mapper = mapper;
            _repository = repository;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody]RegistrationViewModel model )
        {
            {
                try
                {
                    if (ModelState.IsValid)
                    {
                        var newUser = _mapper.Map<RegistrationViewModel, BensBeersUser>(model);


                        var result = await _usermanager.CreateAsync(newUser, model.Password);

                        if (result != IdentityResult.Success)
                        {
                            throw new InvalidOperationException("Could not register");
                        }

                        else
                        {                            
                            return Created($"/api/Accounts/{newUser.Id})", _mapper.Map<BensBeersUser, RegistrationViewModel>(newUser));                            
                        }
                    }
                    else
                    {
                        return BadRequest(ModelState);
                    }

                }
                catch (Exception ex)
                {
                    _logger.LogError($"Failed to Register: {ex}");

                }

                return BadRequest("Failed to Register");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _signinmanager.PasswordSignInAsync(model.Username,
                    model.Password,
                    model.RememberMe,
                    false);

                if (result.Succeeded)
                {
                    if (Request.Query.Keys.Contains("ReturnUrl"))
                    {
                        return Redirect(Request.Query["ReturnUrl"].First());
                    }
                    else
                    {
                        return RedirectToAction("Shop", "App");
                    }
                }
            }
            ModelState.AddModelError("", "Failed to login");

            return RedirectToAction("Shop", "App");
        }

        [HttpGet]
        public async Task<IActionResult> Logout()
        {
            await _signinmanager.SignOutAsync();
            return RedirectToAction("Index", "App");
        }

        [HttpPost("CreateToken")]
        public async Task<IActionResult> CreateToken([FromBody] LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _usermanager.FindByNameAsync(model.Username);
                if (user != null)
                {
                    var result = await _signinmanager.CheckPasswordSignInAsync(user, model.Password, false);

                    if (result.Succeeded)
                    {
                        var claims = new[]
                        {
                            new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                            new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName)
                        };

                        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Tokens:Key"]));
                        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                        var token = new JwtSecurityToken(
                            _config["Tokens:Issuer"],
                            _config["Tokens:Audience"],
                            claims,
                            expires: DateTime.UtcNow.AddHours(5),
                            signingCredentials: creds
                            );

                        var results = new
                        {
                            token = new JwtSecurityTokenHandler().WriteToken(token),
                            expiration = token.ValidTo
                        };

                        return Created("", results);

                    }
                }

            }

            return BadRequest();
        }
    }
}