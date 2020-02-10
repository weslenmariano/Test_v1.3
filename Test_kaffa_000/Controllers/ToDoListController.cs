using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Test_Kaffa_000.Domain.Entity;
using Test_Kaffa_000.Domain.Interafaces;

namespace Test_kaffa_000.Controllers
{
    [Route("api/[controller]")]
    public class ToDoListController : Controller
    {
        private readonly IToDoListRepository _todolistRepository;
        private IHttpContextAccessor _httpContextAccessor;
        private IHostingEnvironment _hostingEnvironment;
        public ToDoListController(IToDoListRepository todolistRepository,
                                 IHttpContextAccessor httpContextAccessor,
                                 IHostingEnvironment hostingEnvironment)
        {
            _todolistRepository = todolistRepository;
            _httpContextAccessor = httpContextAccessor;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Json(_todolistRepository.GetAll());

            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());

            }
        }


        [HttpPost]
        public IActionResult Post([FromBody]ToDoList todolist)
        {
            try
            {
                todolist.Validate();
                if (!todolist.IsValid)
                {
                    return BadRequest(todolist.ShowMsgAlerts());
                }

                if (todolist.Id > 0)
                {
                    _todolistRepository.Update(todolist);
                }
                else
                {
                    _todolistRepository.Add(todolist);
                }

                return Created("api/todolist", todolist);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());

            }
        }

        [HttpPost("Deletar")]
        public IActionResult Deletar([FromBody] ToDoList todolist)
        {
            try
            {
                /// produto da requisicao deve tar a propriedade do Id > 0 para conseguir remover.
                _todolistRepository.Delete(todolist);
                return Json(_todolistRepository.GetAll());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }
    }
}
