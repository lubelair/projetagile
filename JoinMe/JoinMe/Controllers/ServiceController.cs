﻿using JoinMeServices.Models;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace JoinMe.Controllers
{
    public class ServiceController : ApiController
    {
        #region Private Fields

        private JoinMeServicesContext db = new JoinMeServicesContext();

        #endregion Private Fields

        #region Public Methods

        [HttpGet, HttpPost]
        public IHttpActionResult Index()
        {
            return Ok("joinMe web api");
        }

        [ResponseType(typeof(User))]
        [HttpGet, HttpPost]
        public async Task<Object> PostUser(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Users.Add(user);
            await db.SaveChangesAsync();

            return user;
        }

        #endregion Public Methods

        #region Private Methods

        /// <summary>
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        private bool CheckExistUser(User user)
        {
            return db.Users.Count(e => e.UserName.Equals(user.UserName, StringComparison.CurrentCultureIgnoreCase)) > 0;
        }

        #endregion Private Methods
    }
}
