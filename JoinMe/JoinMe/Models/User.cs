using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JoinMeServices.Models
{
    /// <summary>
    /// Class to map with user table
    /// </summary>
    public class User
    {
        private bool _IsActive = true;

        public User()
        {
            CreatedEvents = new List<Event>();
            // Friends = new List<User>();
        }

        [DataType(DataType.DateTime)]
        public DateTime CreationTime { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string FirstName { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }

        // public virtual ICollection<UserFriend> Friends { get; set; }
        public virtual ICollection<EventFriend> InvitedEvents { get; set; }

        [DefaultValue(true)]
        public bool IsActive { get; set; }

        [DefaultValue("false")]
        public bool IsDeleted { get; set; }

        [Required]
        public string LastName { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime ModificationTime { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string PhoneNumber { get; set; }

        [Required]
        public string UserName { get; set; }

        public virtual ICollection<Event> CreatedEvents { get; set; }
    }
}