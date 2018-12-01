using AutoMapper;
using BensBeers.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BensBeers.ViewModels
{
    public class BenMappingProfile : Profile
    {
        public BenMappingProfile()
        {
            CreateMap<Order, OrderViewModel>()
                .ForMember(o => o.OrderID, ex => ex.MapFrom(o => o.Id)) //if you're looking for order id map it from the source of ID.
                .ReverseMap();

            CreateMap<OrderItem, OrderItemViewModel>()
                .ForMember(o => o.BeerId, ex => ex.MapFrom(o => o.Beer.Id))
                .ReverseMap();

            CreateMap<BensBeersUser, RegistrationViewModel>()
                .ForMember(m => m.Password, opt => opt.Ignore())
                .ReverseMap();

            CreateMap<Product, ProductViewModel>()
                .ForMember(p => p.Id, ex => ex.MapFrom(o => o.Id))
                .ReverseMap();

        }
    }
}
