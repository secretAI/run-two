CREATE TABLE tokens(
  id uuid DEFAULT gen_random_uuid(),
  user_email varchar(45) NOT NULL,
  token text NOT NULL,
  created_at timestamp DEFAULT now()::timestamp,
  PRIMARY KEY(id),
  FOREIGN KEY(user_email) REFERENCES users(email)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  UNIQUE(user_email)
);