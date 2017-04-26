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

namespace JoinMe.Controllers
{
    public class ServiceController : ApiController
    {
        private JoinMeServicesContext db = new JoinMeServicesContext();

        [ResponseType(typeof(Object))]
        [HttpGet, HttpPost]
        public async Task<Object> Authenticate(Credentials credentials)
        {
            try
            {
                return await db.Users.Where(e => e.Email.Equals(credentials.Email, StringComparison.CurrentCultureIgnoreCase) &&
                                e.Password.Equals(credentials.Password)).SingleAsync();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        //##################  Fonctions classe Friends
        // Récupere friends
        [ResponseType(typeof(Object))]
        [HttpGet, HttpPost]
        public async Task<Object> GetFriends(Friends friends)
        {
            try
            {
                // return await db.Friends.Where(a => a.UserId == 1 && !a.IsApproved).ToListAsync();
                return await (from a in db.Friends
                              join b in db.Users on a.FriendId equals b.Id
                              where a.UserId == 1 && a.IsApproved
                              select new
                              {
                                  b.FirstName,
                                  b.LastName
                              }).Union(from a in db.Friends
                                       join b in db.Users on a.UserId equals b.Id
                                       where a.FriendId == 1 && a.IsApproved
                                       select new
                                       {
                                           b.FirstName,
                                           b.LastName
                                       }).ToListAsync();
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

        // Récupere invitation
        [ResponseType(typeof(Object))]
        [HttpGet, HttpPost]
        public async Task<Object> GetInvitation(Friends friends)
        {
            try
            {
                // return await db.Friends.Where(a => a.UserId == 1 && !a.IsApproved).ToListAsync();
                return (from a in db.Friends
                        join b in db.Users on a.UserId equals b.Id
                        where a.FriendId == 1 && !a.IsApproved
                        select new
                        {
                            b.FirstName,
                            b.LastName
                        }).ToListAsync();
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

        //##################
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
            try
            {
                if (db.Users.Count(e => e.Email.Equals(user.Email, StringComparison.CurrentCultureIgnoreCase)) == 0 &&
                db.Users.Count(e => e.UserName.Equals(user.UserName, StringComparison.CurrentCultureIgnoreCase)) == 0 &&
                db.Users.Count(e => e.PhoneNumber.Equals(user.PhoneNumber)) == 0)
                {
                    db.Users.Add(user);
                    await db.SaveChangesAsync();
                    return user;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
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
    }
}