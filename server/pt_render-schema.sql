CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) UNIQUE,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  token_id INT NOT NULL,
  user_id INT NOT NULL REFERENCES users ON DELETE CASCADE
);

CREATE TABLE buy_orders (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users ON DELETE CASCADE,
  token_id INT NOT NULL,
  token_name TEXT NOT NULL,
  token_symbol TEXT NOT NULL,
  quantity NUMERIC (20, 6) NOT NULL,
  price NUMERIC (20, 2) NOT NULL,
  date_added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sell_orders (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users ON DELETE CASCADE,
  token_id INT NOT NULL,
  token_name TEXT NOT NULL,
  token_symbol TEXT NOT NULL,
  quantity NUMERIC (20, 6) NOT NULL,
  price NUMERIC (20, 2) NOT NULL,
  date_added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

