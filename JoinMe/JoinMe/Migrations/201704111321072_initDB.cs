namespace JoinMeServices.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initDB : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.EventFriends",
                c => new
                    {
                        FriendId = c.Int(nullable: false),
                        EventId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.FriendId, t.EventId })
                .ForeignKey("dbo.Events", t => t.EventId)
                .ForeignKey("dbo.Users", t => t.FriendId)
                .Index(t => t.FriendId)
                .Index(t => t.EventId);
            
            CreateTable(
                "dbo.Events",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        EventCreationTime = c.DateTime(nullable: false),
                        EventDateTime = c.DateTime(nullable: false),
                        Location = c.String(nullable: false),
                        UserId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CreationTime = c.DateTime(nullable: false),
                        Email = c.String(nullable: false),
                        FirstName = c.String(nullable: false),
                        IsDeleted = c.Boolean(nullable: false),
                        LastName = c.String(nullable: false),
                        ModificationTime = c.DateTime(nullable: false),
                        Password = c.String(nullable: false),
                        PhoneNumber = c.Decimal(nullable: false, precision: 18, scale: 2),
                        UserName = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Friends",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CreationDate = c.DateTime(nullable: false),
                        FriendId = c.Int(nullable: false),
                        IsApproved = c.Boolean(nullable: false),
                        UserId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.FriendId)
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.FriendId)
                .Index(t => t.UserId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Friends", "UserId", "dbo.Users");
            DropForeignKey("dbo.Friends", "FriendId", "dbo.Users");
            DropForeignKey("dbo.EventFriends", "FriendId", "dbo.Users");
            DropForeignKey("dbo.Events", "UserId", "dbo.Users");
            DropForeignKey("dbo.EventFriends", "EventId", "dbo.Events");
            DropIndex("dbo.Friends", new[] { "UserId" });
            DropIndex("dbo.Friends", new[] { "FriendId" });
            DropIndex("dbo.Events", new[] { "UserId" });
            DropIndex("dbo.EventFriends", new[] { "EventId" });
            DropIndex("dbo.EventFriends", new[] { "FriendId" });
            DropTable("dbo.Friends");
            DropTable("dbo.Users");
            DropTable("dbo.Events");
            DropTable("dbo.EventFriends");
        }
    }
}
