using JoinMeServices.Models;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Net.Mail;
using System.Net;

using System.Linq;

namespace JoinMe.Controllers
{
    public class ServiceController : ApiController
    {
        #region Private Fields

        private JoinMeServicesContext db = new JoinMeServicesContext();

        #endregion Private Fields

        #region Public Methods

        [ResponseType(typeof(Object))]
        [HttpGet, HttpPost]
        public async Task<Object> Authenticate(User user)
        {
            try
            {
                return await db.Users.Where(e => e.Email.Equals(user.Email, StringComparison.CurrentCultureIgnoreCase) &&
                               e.Password.Equals(user.Password)).SingleAsync();
            }
            catch (ArgumentNullException)
            {
                return null;
            }
            catch (InvalidOperationException)
            {
                return null;
            }
        }

        [ResponseType(typeof(object))]
        [HttpGet, HttpPost]
        public async Task<object> GetUser(User usr)
        {
            User user = await db.Users.FindAsync(3);
            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpGet, HttpPost]
        public IHttpActionResult Index()
        {
            return Ok("joinMe web api");
        }

        // Ajout du user
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

        //##################  Fonctions classe User
        //Modification du user
        [ResponseType(typeof(User))]
        [HttpGet, HttpPost]
        public async Task<Object> PutUser(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Entry(user).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(user.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return user;
        }

        /*public Object SendPwd(string mail)
        {
        }*/

        private bool ChkExistEmail(string email)
        {
            return db.Users.Count(e => e.Email == email) > 0;
        }

        private bool UserExists(int id)
        {
            return db.Users.Count(e => e.Id == id) > 0;
        }

        #endregion Public Methods
    }
}