CREATE TABLE users(
  id uuid DEFAULT gen_random_uuid(),
  email varchar(45) NOT NULL,
  password text NOT NULL,
  activated boolean DEFAULT false,
  created_at timestamp DEFAULT now()::timestamp,
  PRIMARY KEY(id),
  UNIQUE(email)
);