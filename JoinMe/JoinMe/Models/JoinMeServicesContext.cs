using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace JoinMeServices.Models
{
    public class JoinMeServicesContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        //
        // If you want Entity Framework to drop and regenerate your database automatically whenever
        // you change your model schema, please use data migrations. For more information refer to
        // the documentation: http://msdn.microsoft.com/en-us/data/jj591621.aspx

        #region Public Constructors

        public JoinMeServicesContext() : base("name=JoinMeServicesContext")
        {
        }

        #endregion Public Constructors

        #region Public Properties

        public System.Data.Entity.DbSet<JoinMeServices.Models.EventFriend> EventFriends { get; set; }
        public System.Data.Entity.DbSet<JoinMeServices.Models.Event> Events { get; set; }
        public System.Data.Entity.DbSet<JoinMeServices.Models.Friends> Friends { get; set; }
        public System.Data.Entity.DbSet<JoinMeServices.Models.User> Users { get; set; }

        #endregion Public Properties

        #region Protected Methods

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            // EventFriend relation
            modelBuilder.Entity<EventFriend>()
        .HasKey(c => new { c.FriendId, c.EventId });

            modelBuilder.Entity<User>()
                .HasMany(c => c.InvitedEvents)
                .WithRequired()
                .HasForeignKey(c => c.FriendId).
                WillCascadeOnDelete(false);

            modelBuilder.Entity<Event>()
                .HasMany(c => c.InvitedFriends)
                .WithRequired()
                .HasForeignKey(c => c.EventId).WillCascadeOnDelete(false);

            // Friends relation
            modelBuilder.Entity<Friends>()
                        .HasRequired(p => p.User)
                        .WithMany()
                        .HasForeignKey(p => p.UserId)
                        .WillCascadeOnDelete(true);
            modelBuilder.Entity<Friends>()
                        .HasRequired(p => p.Friend)
                        .WithMany()
                        .HasForeignKey(p => p.FriendId)
                        .WillCascadeOnDelete(false);
        }

        #endregion Protected Methods
    }
}
