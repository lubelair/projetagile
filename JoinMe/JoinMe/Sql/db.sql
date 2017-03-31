/*------------------------------------------------------------
*        Script SQLSERVER 
------------------------------------------------------------*/


/*------------------------------------------------------------
-- Table: User
------------------------------------------------------------*/
CREATE TABLE User(
	id               INT IDENTITY (1,1) NOT NULL ,
	nomUser          VARCHAR (35) NOT NULL ,
	prenomUser       VARCHAR (35) NOT NULL ,
	dateCreation     DATETIME NOT NULL ,
	dateModification DATETIME NOT NULL ,
	isDelete         bit  NOT NULL ,
	CompteActive     bit  NOT NULL ,
	photoUser        VARBINARY(MAX)  NOT NULL ,
	numeroTelephone  NUMERIC (10,0)  NOT NULL UNIQUE,
	pseudoUser       VARCHAR (35) NOT NULL UNIQUE,
	adresseMail      VARCHAR (60) NOT NULL UNIQUE,
	motdepasse       VARCHAR (25)  ,
	CONSTRAINT prk_constraint_User PRIMARY KEY NONCLUSTERED (id)
);


/*------------------------------------------------------------
-- Table: Event
------------------------------------------------------------*/
CREATE TABLE Event(
	id               INT IDENTITY (1,1) NOT NULL ,
	dateCreation     DATETIME NOT NULL ,
	dateModification DATETIME NOT NULL ,
	adresse          VARCHAR (25)  ,
	description      VARCHAR (25)  ,
	id_User          INT  NOT NULL ,
	CONSTRAINT prk_constraint_Event PRIMARY KEY NONCLUSTERED (id)
);


/*------------------------------------------------------------
-- Table: posseder
------------------------------------------------------------*/
CREATE TABLE posseder(
	isAccepted bit   ,
	id_User         INT  NOT NULL ,
	id_Friend    INT  NOT NULL ,
	CONSTRAINT prk_constraint_posseder PRIMARY KEY NONCLUSTERED (id_Friend,id_User)
);


/*------------------------------------------------------------
-- Table: inviter
------------------------------------------------------------*/
CREATE TABLE inviter(
	isAccepted bit   ,
	id_Friend         INT  NOT NULL ,
	id_Event   INT  NOT NULL ,
	CONSTRAINT prk_constraint_inviter PRIMARY KEY NONCLUSTERED (id_Friend,id_Event)
);

CREATE INDEX User_nomUser_idx ON User (nomUser);
CREATE INDEX User_prenomUser_idx ON User (prenomUser);

ALTER TABLE Event ADD CONSTRAINT FK_Event_id_User FOREIGN KEY (id_User) REFERENCES User(id);
ALTER TABLE posseder ADD CONSTRAINT FK_posseder_id_Friend FOREIGN KEY (id_Friend) REFERENCES User(id);
ALTER TABLE posseder ADD CONSTRAINT FK_posseder_id_User FOREIGN KEY (id_User) REFERENCES User(id);
ALTER TABLE inviter ADD CONSTRAINT FK_inviter_id_Friend FOREIGN KEY (id_Friend) REFERENCES User(id);
ALTER TABLE inviter ADD CONSTRAINT FK_inviter_id_Event FOREIGN KEY (id_Event) REFERENCES Event(id);
