create table SATELLITE (
	ID serial primary key,
	NAME VARCHAR(255) unique not null,
	COORDINATE_X integer not null,
	COORDINATE_Y integer not null
);

insert into SATELLITE(NAME, COORDINATE_X, COORDINATE_Y) values ('kenobi', -500, 200);
insert into SATELLITE(NAME, COORDINATE_X, COORDINATE_Y) values ('skywalker', 100, -100);
insert into SATELLITE(NAME, COORDINATE_X, COORDINATE_Y) values ('sato', 500, 100);

