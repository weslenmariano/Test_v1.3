using System;
using System.Collections.Generic;
using System.Text;
using Test_Kaffa_000.Domain.Entity;
using Test_Kaffa_000.Domain.Interafaces;
using Test_Kaffa_000.Repository.Context;

namespace Test_Kaffa_000.Repository.Repository
{
    public class ToDoListRepository : BaseRepository<ToDoList>, IToDoListRepository
    {

        public ToDoListRepository(TestContext testContext) : base(testContext)
        {
        }
    }
}
