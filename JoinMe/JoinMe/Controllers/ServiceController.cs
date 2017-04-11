using JoinMeServices.Models;
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

        private Object Authenticate(User user)
        {
            if (db.Users.Count(e => e.Email.Equals(user.Email, StringComparison.CurrentCultureIgnoreCase) &&
                               e.Password.Equals(user.Password)) > 0)
            {
                return db.Users.Single(e => e.Email.Equals(user.Email, StringComparison.CurrentCultureIgnoreCase) &&
                                e.Password.Equals(user.Password));
                //Where(e => e.Email.Equals(user.Email, StringComparison.CurrentCultureIgnoreCase) &&
                /// e.Password.Equals(user.Password)).Single();
            }
            return null;
        }

        private bool CheckExistUser(User user)
        {
            return db.Users.Count(e => e.UserName.Equals(user.UserName, StringComparison.CurrentCultureIgnoreCase) &&
                                  e.PhoneNumber.Equals(user.PhoneNumber) &&
                                  e.Email.Equals(user.Email, StringComparison.CurrentCultureIgnoreCase)) > 0;
        }

        #endregion Public Methods
    }
}