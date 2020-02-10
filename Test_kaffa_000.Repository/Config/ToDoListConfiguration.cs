using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;
using Test_Kaffa_000.Domain.Entity;

namespace Test_Kaffa_000.Repository.Config
{
    public class ToDoListConfiguration : IEntityTypeConfiguration<ToDoList>
    {
        public void Configure(EntityTypeBuilder<ToDoList> builder)
        {
            builder.HasKey(t => t.Id);

            builder
                .Property(t => t.TaskTitle)
                .IsRequired()
                .HasMaxLength(50);
            builder
                .Property(t => t.TaskDescription)
                .IsRequired()
                .HasMaxLength(400);
            builder
               .Property(t => t.DateInput)
               .IsRequired()
               .HasDefaultValueSql("sysdate()");

        }
    }
}
