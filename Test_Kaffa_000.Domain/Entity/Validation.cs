using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Test_Kaffa_000.Domain.Entity
{
    public abstract class Validation
    {
        private List<string> _msgValidation { get; set; }

        private List<string> msgValidation
        {
            get { return _msgValidation ?? (_msgValidation = new List<string>()); }
        }

        protected void ClearMsgValidation()
        {
            msgValidation.Clear();
        }

        protected void AddAlert(string msg)
        {
            msgValidation.Add(msg);
        }

        public string ShowMsgAlerts()
        {
            return string.Join(". " + "\r\n", msgValidation);
        }

        public abstract void Validate();

        public bool IsValid
        {
            get { return (!msgValidation.Any()); }
        }
    }
}
