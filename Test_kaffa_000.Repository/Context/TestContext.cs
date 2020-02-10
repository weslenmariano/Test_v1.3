using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Test_Kaffa_000.Domain.Entity;
using Test_Kaffa_000.Repository.Config;

namespace Test_Kaffa_000.Repository.Context
{
    public class TestContext : DbContext
    {
        public DbSet<ToDoList> ToDoLists { get; set; }

        public TestContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ToDoListConfiguration());
            base.OnModelCreating(modelBuilder);
        }
    }
}
