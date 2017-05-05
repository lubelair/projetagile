using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using JoinMeServices.Models;

namespace JoinMeServices.Controllers
{
    public class FriendsController : ApiController
    {
        #region Private Fields

        private JoinMeServicesContext db = new JoinMeServicesContext();

        #endregion Private Fields

        #region Public Methods

        // DELETE: api/Friends/5
        [ResponseType(typeof(Friends))]
        public async Task<IHttpActionResult> DeleteFriends(int id)
        {
            Friends friends = await db.Friends.FindAsync(id);
            if (friends == null)
            {
                return NotFound();
            }

            db.Friends.Remove(friends);
            await db.SaveChangesAsync();

            return Ok(friends);
        }

        // GET: api/Friends/5
        [ResponseType(typeof(Friends))]
        public async Task<IHttpActionResult> GetFriends(int id)
        {
            Friends friends = await db.Friends.FindAsync(id);
            if (friends == null)
            {
                return NotFound();
            }

            return Ok(friends);
        }

        // POST: api/Friends
        [ResponseType(typeof(Friends))]
        public async Task<IHttpActionResult> PostFriends(Friends friends)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Friends.Add(friends);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = friends.Id }, friends);
        }

        // PUT: api/Friends/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutFriends(int id, Friends friends)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != friends.Id)
            {
                return BadRequest();
            }

            db.Entry(friends).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FriendsExists(id))
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

        // GET: api/Friends
        public IQueryable<Friends> r()
        {
            return db.Friends;
        }

        #endregion Public Methods

        #region Protected Methods

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        #endregion Protected Methods

        #region Private Methods

        private bool FriendsExists(int id)
        {
            return db.Friends.Count(e => e.Id == id) > 0;
        }

        #endregion Private Methods
    }
}
