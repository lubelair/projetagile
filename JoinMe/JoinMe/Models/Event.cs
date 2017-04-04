using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JoinMeServices.Models
{
    /// <summary>
    /// Class to map with Event table
    /// </summary>
    public class Event
    {
        #region Public Properties

        [DataType(DataType.DateTime)]
        [Required]
        public DateTime EventCreationTime { get; set; }

        [DataType(DataType.DateTime)]
        [Required]
        public DateTime EventDateTime { get; set; }

        // [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        [Column(Order = 0)]
        public int Id { get; set; }

        public virtual ICollection<EventFriend> InvitedFriends { get; set; }

        [Required]
        public string Location { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }

        public int UserId { get; set; }

        #endregion Public Properties
    }
}
