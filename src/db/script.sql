create table SATELLITE (
	ID serial primary key,
	NAME VARCHAR(255) unique not null,
	COORDINATE_X integer not null,
	COORDINATE_Y integer not null
);

insert into SATELLITE(NAME, COORDINATE_X, COORDINATE_Y) values ('kenobi', -500, -200);
insert into SATELLITE(NAME, COORDINATE_X, COORDINATE_Y) values ('skywalker', 100, -100);
insert into SATELLITE(NAME, COORDINATE_X, COORDINATE_Y) values ('sato', 500, 100);

create table MESSAGE (
	ID serial primary key,
	DISTANCE NUMERIC(20,10) not null,
	DATE TIMESTAMP not null,
	SATELLITE_ID integer not null,
	constraint fk_satellite
		foreign key(SATELLITE_ID)
			references SATELLITE(ID)
);

create table MSG_WORD (
	ID serial primary key,
	WORD varchar(255) not null,
	POS integer not null,
	MESSAGE_ID integer not null,
	constraint fk_message
		foreign key(MESSAGE_ID)
			references MESSAGE(ID)
);