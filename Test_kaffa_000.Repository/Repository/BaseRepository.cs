using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Test_Kaffa_000.Domain.Interafaces;
using Test_Kaffa_000.Repository.Context;

namespace Test_Kaffa_000.Repository.Repository
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : class
    {
        protected readonly TestContext TestContext;

        public BaseRepository(TestContext testContext)
        {
            TestContext = testContext;
        }
        public void Add(TEntity entity)
        {
            TestContext.Set<TEntity>().Add(entity);
            TestContext.SaveChanges();
        }

        public void Update(TEntity entity)
        {
            TestContext.Set<TEntity>().Update(entity);
            TestContext.SaveChanges();
        }

        public TEntity GetById(int id)
        {
            return TestContext.Set<TEntity>().Find(id);
        }

        public IEnumerable<TEntity> GetAll()
        {
            return TestContext.Set<TEntity>().ToList();
        }

        public void Delete(TEntity entity)
        {
            TestContext.Remove(entity);
            TestContext.SaveChanges();
        }
        public void Dispose()
        {
            TestContext.Dispose();
        }
    }
}
