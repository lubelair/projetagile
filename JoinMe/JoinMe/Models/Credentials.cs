using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JoinMeServices.Models
{
    /// <summary>
    /// </summary>
    public class Credentials
    {
        #region Public Properties

        public string Email { get; set; }

        public string Password { get; set; }

        #endregion Public Properties
    }
}
