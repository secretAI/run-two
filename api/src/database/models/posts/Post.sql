CREATE TABLE posts(
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