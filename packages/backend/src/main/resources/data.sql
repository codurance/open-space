insert into spaces (id, name, description, location, facilities)
values (1, 'Name 1', 'Big size space with 10 chairs, aircon, and TV', '3rd floor', 'TV, Chromecast');

insert into spaces (id, name, description, location, facilities)
values (2, 'Name 2', 'Tiny room with no windows', '4th floor', 'TV, Chromecast, Projecter');

insert into sessions (title, location_id, time, presenter, type)
values ('Session 1', 1, '11:00', 'David', 'Round Table');

insert into sessions (title, location_id, time, presenter, type)
values ('Session 2', 1, '13:00', 'Andrei', 'Lecture');

insert into sessions (title, location_id, time, presenter, type)
values ('Session 3', 2, '14:00', 'Sherlock', 'Mobbing');

insert into sessions (title, location_id, time, presenter, type)
values ('Session 4', 2, '14:00', 'Tacuma', 'Round Table');

