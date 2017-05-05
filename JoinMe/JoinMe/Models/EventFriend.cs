using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JoinMeServices.Models
{
    /// <summary>
    /// Class to map with event friend table
    /// </summary>
    public class EventFriend
    {
        #region Public Properties

        [ForeignKey("EventId")]
        public virtual Event Event { get; set; }

        public int EventId { get; set; }

        public int FriendId { get; set; }

        [ForeignKey("FriendId")]
        public virtual User User { get; set; }

        #endregion Public Properties
    }
}
