drop schema if exists ccca;

create schema ccca;

create table ccca.account {
  account_id uuid primary key,
  name text not null,
  email text unique,
  document text unique,
  password text not null,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp
}