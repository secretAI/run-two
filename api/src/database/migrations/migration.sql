BEGIN;

SET statement_timeout = 0; /* Max statement execution timeout */
SET idle_in_transaction_session_timeout = 0;
SET check_function_bodies = false;
SET row_security = off;
SET client_encoding = "UTF8";
SET datestyle TO "ISO, YMD"; /* 1970.01.01 */

CREATE TABLE users(
  id uuid DEFAULT gen_random_uuid(),
  email varchar(45) NOT NULL,
  password text NOT NULL,
  activated boolean DEFAULT false,
  created_at timestamp DEFAULT now()::timestamp,
  aid uuid,
  PRIMARY KEY(id),
  UNIQUE(email)
);

CREATE TABLE IF NOT EXISTS posts(
  id uuid DEFAULT gen_random_uuid(),
  user_email varchar(45) NOT NULL,
  title varchar(30) NOT NULL,
  body varchar(100) NOT NULL,
  media text,
  created_at timestamp DEFAULT now()::timestamp,
  PRIMARY KEY(id),
  FOREIGN KEY(user_email) REFERENCES users(email)
    ON UPDATE CASCADE 
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tokens(
  id uuid DEFAULT gen_random_uuid(),
  user_email varchar(45) NOT NULL,
  token text NOT NULL,
  expires_at timestamp NOT NULL,
  created_at timestamp DEFAULT now()::timestamp,
  PRIMARY KEY(id),
  FOREIGN KEY(user_email) REFERENCES users(email)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  UNIQUE(user_email)
);

END;
