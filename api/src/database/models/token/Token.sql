CREATE TABLE tokens(
  user_email varchar(45) NOT NULL,
  token text NOT NULL,
  PRIMARY KEY(user_email),
  FOREIGN KEY(user_email) REFERENCES users(email)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  UNIQUE(user_email)
);