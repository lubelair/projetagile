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
using System.Collections.Generic;

namespace JoinMe.Controllers
{
    public class ServiceController : ApiController
    {
        private JoinMeServicesContext db = new JoinMeServicesContext();

        /// <summary>
        /// Comparaison des données utilisateurs saisies avec la BDD lors du login (Email/MDP)
        /// </summary>
        /// <param name="credentials"></param>
        /// <returns></returns>
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

        /// <summary>
        /// Suppression de l'utilisateur s'il est trouvé en BDD
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [ResponseType(typeof(User))]
        [HttpGet, HttpPost]
        public async Task<IHttpActionResult> DeleteUser(Object userId)
        {
            User user = await db.Users.FindAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            db.Users.Remove(user);
            await db.SaveChangesAsync();

            return Ok(user);
        }

        /// <summary>
        /// Récupération des données des événements reçus par l'utilisateur connecté
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [ResponseType(typeof(Object))]
        [HttpGet, HttpPost]
        public async Task<Object> GetEventsrecived(Object userId)
        {
            try
            {
                var id = int.Parse(userId.ToString());
                return await (from a in db.Events
                              join b in db.EventFriends on a.Id equals b.EventId
                              join c in db.Users on a.UserId equals c.Id
                              where b.FriendId == id
                              select new
                              {
                                  a.EventDateTime,
                                  a.Location,
                                  a.NomEvent,
                                  c.UserName
                              }).ToListAsync();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        /// <summary>
        /// Récupération des données des événements créés et envoyés par l'utilisateur connecté
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [ResponseType(typeof(Object))]
        [HttpGet, HttpPost]
        public async Task<Object> GetEventssend(Object userId)
        {
            try
            {
                var id = int.Parse(userId.ToString());
                // return await db.Friends.Where(a => a.UserId == 1 && !a.IsApproved).ToListAsync();
                return await (from a in db.Events
                              join b in db.Users on a.UserId equals b.Id
                              where a.UserId == id
                              select new
                              {
                                  a.EventDateTime,
                                  a.Location,
                                  a.NomEvent
                              }).ToListAsync();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        /// <summary>
        /// Récupération des amis de l'utilisateur connecté On ne retourne que les amis acceptés par
        /// l'utilisateur et dont le compte est actif
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [ResponseType(typeof(Object))]
        [HttpGet, HttpPost]
        public async Task<Object> GetFriends(Object userId)
        {
            try
            {
                var id = int.Parse(userId.ToString());
                return await (from a in db.Friends
                              join b in db.Users on a.FriendId equals b.Id
                              where a.UserId == id && a.IsApproved && !b.IsDeleted && b.IsActive
                              select new
                              {
                                  b.FirstName,
                                  b.LastName,
                                  b.Id
                              }).Union(from a in db.Friends
                                       join b in db.Users on a.UserId equals b.Id
                                       where a.FriendId == id && a.IsApproved && !b.IsDeleted && b.IsActive
                                       select new
                                       {
                                           b.FirstName,
                                           b.LastName,
                                           b.Id
                                       }).ToListAsync();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        /// <summary>
        /// Récupération des amis pas encore approuvés
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [ResponseType(typeof(Object))]
        [HttpGet, HttpPost]
        public async Task<Object> GetInvitations(Object userId)
        {
            try
            {
                var id = int.Parse(userId.ToString());
                return await (from a in db.Friends
                              join b in db.Users on a.FriendId equals b.Id
                              where a.UserId == id && !a.IsApproved
                              select new
                              {
                                  b.Id,
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

        /// <summary>
        /// Récupération des données utilisateur
        /// </summary>
        /// <param name="usr"></param>
        /// <returns></returns>
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

        /// <summary>
        /// Récupération des données d'un utilisateur à partir de son pseudonyme
        /// </summary>
        /// <param name="userName"></param>
        /// <returns></returns>
        [ResponseType(typeof(Object))]
        [HttpGet, HttpPost]
        public async Task<Object> GetUsers(Object userName)
        {
            try
            {
                var name = userName.ToString();
                return await (from a in db.Users
                              where a.UserName.Equals(name) && a.IsActive && !a.IsDeleted
                              select new
                              {
                                  a.Id,
                                  a.FirstName,
                                  a.LastName,
                                  a.UserName
                              }).ToListAsync();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        /// <summary>
        ///
        /// </summary>
        /// <returns></returns>
        [HttpGet, HttpPost]
        public IHttpActionResult Index()
        {
            // Point d'entrée de l'API
            return Ok("joinMe web api");
        }

        /// <summary>
        /// Ajout d'un événement en BDD lors de la création d'événement
        /// </summary>
        /// <param name="evenement"></param>
        /// <returns></returns>
        [ResponseType(typeof(Object))]
        public async Task<Object> PostEvent(Event e)
        {
            var _event = new Event { NomEvent = e.NomEvent, EventDateTime = e.EventDateTime, Location = e.Location, UserId = e.UserId, EventCreationTime = e.EventDateTime };

            try
            {
                var Event = db.Events.Add(_event);

                //  int eventId = await db.SaveChangesAsync();
                List<EventFriend> invitedFriends = new List<EventFriend>(e.InvitedFriends);
                invitedFriends.All(x => { x.Event = Event; return true; });
                foreach (var invitedFriend in invitedFriends)
                {
                    db.EventFriends.Add(invitedFriend);
                }
                await db.SaveChangesAsync();
                return Event;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Ajout d'un utilisateur en BDD lors de l'inscription. L'utilisateur créé ne doit pas avoir
        /// un Email, un Login, ou un Numéro déjà existant en base
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
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

        /// <summary>
        /// Modification des données de l'utilsateur dans la BDD
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
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

        /// <summary>
        /// Vérification de l'existence du mail en BDD
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        private bool ChkExistEmail(string email)
        {
            return db.Users.Count(e => e.Email == email) > 0;
        }

        /// <summary>
        /// Vérification de l'existence de l'utilisateur en BDD
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        private bool UserExists(int id)
        {
            return db.Users.Count(e => e.Id == id) > 0;
        }
    }
}