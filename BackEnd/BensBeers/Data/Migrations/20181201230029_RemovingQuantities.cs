﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace BensBeers.Data.Migrations
{
    public partial class RemovingQuantities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Products");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Quantity",
                table: "Products",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
