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
    public class EventFriendsController : ApiController
    {
        private JoinMeServicesContext db = new JoinMeServicesContext();

        // GET: api/EventFriends
        public IQueryable<EventFriend> GetEventFriends()
        {
            return db.EventFriends;
        }

        // GET: api/EventFriends/5
        [ResponseType(typeof(EventFriend))]
        public async Task<IHttpActionResult> GetEventFriend(int id)
        {
            EventFriend eventFriend = await db.EventFriends.FindAsync(id);
            if (eventFriend == null)
            {
                return NotFound();
            }

            return Ok(eventFriend);
        }

        // PUT: api/EventFriends/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutEventFriend(int id, EventFriend eventFriend)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != eventFriend.FriendId)
            {
                return BadRequest();
            }

            db.Entry(eventFriend).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventFriendExists(id))
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

        // POST: api/EventFriends
        [ResponseType(typeof(EventFriend))]
        public async Task<IHttpActionResult> PostEventFriend(EventFriend eventFriend)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.EventFriends.Add(eventFriend);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (EventFriendExists(eventFriend.FriendId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = eventFriend.FriendId }, eventFriend);
        }

        // DELETE: api/EventFriends/5
        [ResponseType(typeof(EventFriend))]
        public async Task<IHttpActionResult> DeleteEventFriend(int id)
        {
            EventFriend eventFriend = await db.EventFriends.FindAsync(id);
            if (eventFriend == null)
            {
                return NotFound();
            }

            db.EventFriends.Remove(eventFriend);
            await db.SaveChangesAsync();

            return Ok(eventFriend);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EventFriendExists(int id)
        {
            return db.EventFriends.Count(e => e.FriendId == id) > 0;
        }
    }
}