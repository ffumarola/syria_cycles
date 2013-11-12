CREATE TABLE bikes
(
  id serial,
  badge text
);

CREATE TABLE members
(
  id serial,
  name text,
  keyfob text,
  email text
);

CREATE TABLE stations
(
  id serial,
  name text,
  latitude float,
  longitude float,
  capacity int
);

CREATE TABLE bikes_to_stations
(
  id serial,
  bikes_id int,
  stations_id int
);

CREATE TABLE trips
(
  id serial,
  start_time timestamp,
  end_time timestamp,
  members_id int,
  bikes_id int,
  start_station_id int,
  end_station_id int,
  in_progress boolean
);
