/*Table Users*/
SET IDENTITY_INSERT [dbo].[Users] ON
INSERT INTO [dbo].[Users] ([Id], [CreationTime], [Email], [FirstName], [IsDeleted], [LastName], [ModificationTime], [Password], [PhoneNumber], [UserName], [IsActive]) VALUES (1, N'2017-04-10 15:06:55', N'zayd@gmail.com', N'Zayd', 0, N'BEN GARA', N'2017-04-10 15:06:55', N'azerty', N'0607080910', N'zayd', 1)
INSERT INTO [dbo].[Users] ([Id], [CreationTime], [Email], [FirstName], [IsDeleted], [LastName], [ModificationTime], [Password], [PhoneNumber], [UserName], [IsActive]) VALUES (2, N'2017-04-11 08:43:00', N'sarah@gmail.com', N'Sarah', 0, N'ANTIGNY', N'2017-04-11 08:43:00', N'azerty', N'0607080910', N'sarah', 1)
INSERT INTO [dbo].[Users] ([Id], [CreationTime], [Email], [FirstName], [IsDeleted], [LastName], [ModificationTime], [Password], [PhoneNumber], [UserName], [IsActive]) VALUES (3, N'2017-04-11 08:44:02', N'ismail@yahoo.com', N'Ismail', 0, N'BAIH', N'2017-04-11 08:44:02', N'azerty', N'0607080910', N'ismail', 1)
INSERT INTO [dbo].[Users] ([Id], [CreationTime], [Email], [FirstName], [IsDeleted], [LastName], [ModificationTime], [Password], [PhoneNumber], [UserName], [IsActive]) VALUES (4, N'2017-04-11 08:44:26', N'lucas@yahoo.com', N'Lucas', 0, N'BELAIR', N'2017-04-11 08:44:26', N'azerty', N'0607080910', N'lucas', 1)
INSERT INTO [dbo].[Users] ([Id], [CreationTime], [Email], [FirstName], [IsDeleted], [LastName], [ModificationTime], [Password], [PhoneNumber], [UserName], [IsActive]) VALUES (5, N'2017-04-11 08:44:58', N'joel@laposte.com', N'Joel', 0, N'AKOUN', N'2017-04-11 08:44:58', N'azerty', N'0607080910', N'joel', 1)
INSERT INTO [dbo].[Users] ([Id], [CreationTime], [Email], [FirstName], [IsDeleted], [LastName], [ModificationTime], [Password], [PhoneNumber], [UserName], [IsActive]) VALUES (6, N'2017-04-11 08:45:24', N'amine@laposte.com', N'Amine', 0, N'ALILOU', N'2017-04-11 08:45:24', N'azerty', N'0607080910', N'amine', 1)
SET IDENTITY_INSERT [dbo].[Users] OFF
/*Table Friends*/
SET IDENTITY_INSERT [dbo].[Friends] ON
INSERT INTO [dbo].[Friends] ([Id], [CreationDate], [FriendId], [IsApproved], [UserId]) VALUES (2, N'2017-04-11 11:20:55', 2, 0, 1)
INSERT INTO [dbo].[Friends] ([Id], [CreationDate], [FriendId], [IsApproved], [UserId]) VALUES (4, N'2017-04-11 11:21:55', 3, 1, 1)
INSERT INTO [dbo].[Friends] ([Id], [CreationDate], [FriendId], [IsApproved], [UserId]) VALUES (9, N'2017-04-10 15:06:55', 1, 0, 6)
INSERT INTO [dbo].[Friends] ([Id], [CreationDate], [FriendId], [IsApproved], [UserId]) VALUES (11, N'2017-04-10 15:06:55', 1, 1, 5)
INSERT INTO [dbo].[Friends] ([Id], [CreationDate], [FriendId], [IsApproved], [UserId]) VALUES (13, N'2017-05-04 15:36:00', 2, 0, 6)
INSERT INTO [dbo].[Friends] ([Id], [CreationDate], [FriendId], [IsApproved], [UserId]) VALUES (14, N'2017-05-04 15:38:00', 2, 1, 5)
INSERT INTO [dbo].[Friends] ([Id], [CreationDate], [FriendId], [IsApproved], [UserId]) VALUES (15, N'2017-05-04 15:40:00', 4, 1, 2)
INSERT INTO [dbo].[Friends] ([Id], [CreationDate], [FriendId], [IsApproved], [UserId]) VALUES (16, N'2017-05-04 15:38:00', 3, 0, 2)
INSERT INTO [dbo].[Friends] ([Id], [CreationDate], [FriendId], [IsApproved], [UserId]) VALUES (17, N'2017-05-04 15:43:00', 6, 1, 3)
INSERT INTO [dbo].[Friends] ([Id], [CreationDate], [FriendId], [IsApproved], [UserId]) VALUES (19, N'2017-05-04 15:45:00', 6, 1, 5)
SET IDENTITY_INSERT [dbo].[Friends] OFF
/*Table Events*/
SET IDENTITY_INSERT [dbo].[Events] ON
INSERT INTO [dbo].[Events] ([Id], [EventCreationTime], [EventDateTime], [Location], [UserId], [NomEvent]) VALUES (1, N'2017-04-28 11:00:00', N'2017-04-28 20:00:00', N'5 Place de la Victoire, 33000 Bordeaux', 1, N'After')
INSERT INTO [dbo].[Events] ([Id], [EventCreationTime], [EventDateTime], [Location], [UserId], [NomEvent]) VALUES (2, N'2017-04-28 11:00:00', N'2017-04-28 19:00:00', N'95 Cours Maréchal Juin, 33000 Bordeaux', 2, N'Befor')
INSERT INTO [dbo].[Events] ([Id], [EventCreationTime], [EventDateTime], [Location], [UserId], [NomEvent]) VALUES (6, N'2017-05-04 15:50:00', N'2017-05-05 18:00:00', N'Place Pey Berland, 33000 Bordeaux', 6, N'1664')
SET IDENTITY_INSERT [dbo].[Events] OFF
/*Table EventFriends*/
INSERT INTO [dbo].[EventFriends] ([FriendId], [EventId]) VALUES (3, 1)
INSERT INTO [dbo].[EventFriends] ([FriendId], [EventId]) VALUES (4, 1)
INSERT INTO [dbo].[EventFriends] ([FriendId], [EventId]) VALUES (1, 1)
INSERT INTO [dbo].[EventFriends] ([FriendId], [EventId]) VALUES (5, 2)
INSERT INTO [dbo].[EventFriends] ([FriendId], [EventId]) VALUES (2, 2)
INSERT INTO [dbo].[EventFriends] ([FriendId], [EventId]) VALUES (6, 2)
INSERT INTO [dbo].[EventFriends] ([FriendId], [EventId]) VALUES (1, 6)
INSERT INTO [dbo].[EventFriends] ([FriendId], [EventId]) VALUES (2, 6)
INSERT INTO [dbo].[EventFriends] ([FriendId], [EventId]) VALUES (3, 6)
/*Table __MigrationHistory*/
