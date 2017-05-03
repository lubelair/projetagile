/*Table Users*/
SET IDENTITY_INSERT [dbo].[Users] ON
INSERT INTO [dbo].[Users] ([Id], [CreationTime], [Email], [FirstName], [IsDeleted], [LastName], [ModificationTime], [Password], [PhoneNumber], [UserName], [IsActive]) VALUES (1, N'2017-04-10 15:06:55', N'zayd@zayd.zayd', N'zayd', 0, N'zayd', N'2017-04-10 15:06:55', N'zaydzayd', N'0633692098', N'zayd', 1)
INSERT INTO [dbo].[Users] ([Id], [CreationTime], [Email], [FirstName], [IsDeleted], [LastName], [ModificationTime], [Password], [PhoneNumber], [UserName], [IsActive]) VALUES (2, N'2017-04-11 08:43:00', N'sarah@sarah.com', N'sarah', 0, N'sarah', N'2017-04-11 08:43:00', N'aaaaaaaaaa', N'101010101.00', N'sarah', 1)
INSERT INTO [dbo].[Users] ([Id], [CreationTime], [Email], [FirstName], [IsDeleted], [LastName], [ModificationTime], [Password], [PhoneNumber], [UserName], [IsActive]) VALUES (3, N'2017-04-11 08:44:02', N'ismail@ismail.com', N'ismail', 0, N'ismail', N'2017-04-11 08:44:02', N'azazazaz', N'101010101.00', N'ismail', 1)
INSERT INTO [dbo].[Users] ([Id], [CreationTime], [Email], [FirstName], [IsDeleted], [LastName], [ModificationTime], [Password], [PhoneNumber], [UserName], [IsActive]) VALUES (4, N'2017-04-11 08:44:26', N'lucas@lucas.fr', N'lucas', 0, N'lucas', N'2017-04-11 08:44:26', N'azazazaz', N'101010101.00', N'lucas', 1)
INSERT INTO [dbo].[Users] ([Id], [CreationTime], [Email], [FirstName], [IsDeleted], [LastName], [ModificationTime], [Password], [PhoneNumber], [UserName], [IsActive]) VALUES (5, N'2017-04-11 08:44:58', N'joel@joel.ct', N'joel', 0, N'joel', N'2017-04-11 08:44:58', N'azazazaz', N'101010101.00', N'joel', 1)
INSERT INTO [dbo].[Users] ([Id], [CreationTime], [Email], [FirstName], [IsDeleted], [LastName], [ModificationTime], [Password], [PhoneNumber], [UserName], [IsActive]) VALUES (6, N'2017-04-11 08:45:24', N'amine@amine.mr', N'amine', 0, N'amine', N'2017-04-11 08:45:24', N'azazazaz', N'101010101.00', N'amine', 1)
SET IDENTITY_INSERT [dbo].[Users] OFF
/*Table Friends*/
SET IDENTITY_INSERT [dbo].[Friends] ON
INSERT INTO [dbo].[Friends] ([Id], [CreationDate], [FriendId], [IsApproved], [UserId]) VALUES (2, N'2017-04-11 11:20:55', 2, 0, 1)
INSERT INTO [dbo].[Friends] ([Id], [CreationDate], [FriendId], [IsApproved], [UserId]) VALUES (4, N'2017-04-11 11:21:55', 3, 1, 1)
INSERT INTO [dbo].[Friends] ([Id], [CreationDate], [FriendId], [IsApproved], [UserId]) VALUES (5, N'2017-04-10 15:06:55', 4, 1, 1)
INSERT INTO [dbo].[Friends] ([Id], [CreationDate], [FriendId], [IsApproved], [UserId]) VALUES (8, N'2017-04-10 15:06:55', 6, 0, 1)
INSERT INTO [dbo].[Friends] ([Id], [CreationDate], [FriendId], [IsApproved], [UserId]) VALUES (9, N'2017-04-10 15:06:55', 2, 1, 6)
INSERT INTO [dbo].[Friends] ([Id], [CreationDate], [FriendId], [IsApproved], [UserId]) VALUES (11, N'2017-04-10 15:06:55', 1, 1, 5)
SET IDENTITY_INSERT [dbo].[Friends] OFF
/*Table Events*/
SET IDENTITY_INSERT [dbo].[Events] ON
INSERT INTO [dbo].[Events] ([Id], [EventCreationTime], [EventDateTime], [Location], [UserId], [NomEvent]) VALUES (1, N'2017-04-28 11:00:00', N'2017-04-28 20:00:00', N'5 Place de la Victoire, 33000 Bordeaux', 1, N'')
INSERT INTO [dbo].[Events] ([Id], [EventCreationTime], [EventDateTime], [Location], [UserId], [NomEvent]) VALUES (2, N'2017-04-28 11:00:00', N'2017-04-28 19:00:00', N'95 Cours Maréchal Juin, 33000 Bordeaux', 2, N'')
SET IDENTITY_INSERT [dbo].[Events] OFF
/*Table EventFriends*/
INSERT INTO [dbo].[EventFriends] ([FriendId], [EventId]) VALUES (3, 1)
INSERT INTO [dbo].[EventFriends] ([FriendId], [EventId]) VALUES (4, 1)
INSERT INTO [dbo].[EventFriends] ([FriendId], [EventId]) VALUES (1, 2)
INSERT INTO [dbo].[EventFriends] ([FriendId], [EventId]) VALUES (5, 2)
/*Table __MigrationHistory*/
INSERT INTO [dbo].[__MigrationHistory] ([MigrationId], [ContextKey], [Model], [ProductVersion]) VALUES (N'201704051441249_initialDB', N'JoinMeServices.Migrations.Configuration', <Binary Data>, N'6.1.3-40302')
INSERT INTO [dbo].[__MigrationHistory] ([MigrationId], [ContextKey], [Model], [ProductVersion]) VALUES (N'201704101454496_initDB', N'JoinMeServices.Migrations.Configuration', <Binary Data>, N'6.1.3-40302')
INSERT INTO [dbo].[__MigrationHistory] ([MigrationId], [ContextKey], [Model], [ProductVersion]) VALUES (N'201704270732341_initDB', N'JoinMeServices.Migrations.Configuration', <Binary Data>, N'6.1.3-40302')
INSERT INTO [dbo].[__MigrationHistory] ([MigrationId], [ContextKey], [Model], [ProductVersion]) VALUES (N'201705020858327_initDB1', N'JoinMeServices.Migrations.Configuration', <Binary Data>, N'6.1.3-40302')
