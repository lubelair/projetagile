using JoinMeServices.Models;
using System;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
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

        [HttpGet, HttpPost]
        public IHttpActionResult Index()
        {
            return Ok("joinMe web api");
        }

        //##################  Fonctions classe User

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

        //Modification du user
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutUser(int id, User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.Id)
            {
                return BadRequest();
            }

            db.Entry(user).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        #endregion Public Methods

        #region Private Methods

        private bool UserExists(int id)
        {
            return db.Users.Count(e => e.Id == id) > 0;
        }

        #endregion Private Methods
    }
}