using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace JoinMeServices.Models
{
    /// <summary>
    /// Class to map with UserFriend table
    /// </summary>
    public class Friends
    {
        #region Public Properties

        [DataType(DataType.DateTime)]
        public DateTime CreationDate { get; set; }

        [ForeignKey("UserId")]
        public virtual User Friend { get; set; }

        public int FriendId { get; set; }

        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [DefaultValue("false")]
        public bool IsApproved { get; set; }

        [ForeignKey("FriendId")]
        public virtual User User { get; set; }

        public int UserId { get; set; }

        #endregion Public Properties
    }
}
