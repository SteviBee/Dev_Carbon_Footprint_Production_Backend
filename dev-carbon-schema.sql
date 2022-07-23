CREATE TABLE actions (
  action_id SERIAL PRIMARY KEY,
  action TEXT UNIQUE NOT NULL,
  co2e INTEGER,
  co2e_units TEXT,
  type TEXT
);

CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL
);
