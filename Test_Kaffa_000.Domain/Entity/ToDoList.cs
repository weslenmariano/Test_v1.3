using System;
using System.Collections.Generic;
using System.Text;

namespace Test_Kaffa_000.Domain.Entity
{
    public class ToDoList : Validation
    {
        public int Id { get; set; }
        public string TaskTitle { get; set; }
        public string TaskDescription { get; set; }
        public DateTime DateInput { get; set; }

        public override void Validate()
        {
            ClearMsgValidation();

            if (string.IsNullOrEmpty(TaskTitle))
                AddAlert("O título da tarefa não pode ser vazio.");

            if (string.IsNullOrEmpty(TaskDescription))
                AddAlert("A descrição não pode ser vazio.");
        }
    }
}
