CREATE TABLE permissions (
  "id_permission" INT PRIMARY KEY NOT NULL,
  "name" VARCHAR(25) NOT NULL
);

CREATE TABLE users (
  "id_user" SERIAL PRIMARY KEY NOT NULL,
  "name" VARCHAR(50) NOT NULL,
  "email" VARCHAR(100) NOT NULL,
  "password" VARCHAR(20) NOT NULL,
  "id_permission" INT NOT NULL
);

CREATE TABLE category (
  "id_category" SERIAL PRIMARY KEY NOT NULL,
  "name" VARCHAR(45) NOT NULL
);

CREATE TABLE products (
  "id_produto" SERIAL PRIMARY KEY NOT NULL,
  "name" VARCHAR(50) NOT NULL,
  "perc_sell" DECIMAL NOT NULL,
  "price_buy" DECIMAL NOT NULL,
  "price_sell" DECIMAL NOT NULL,
  "min_stock" INT NOT NULL,
  "max_stock" INT NOT NULL,
  "id_categoria" INT NOT NULL,
  "status" VARCHAR(20) NOT NULL
);

CREATE TABLE stock (
  "id_stock" SERIAL PRIMARY KEY NOT NULL,
  "id_produto" INT,
  "qtd" INT,
  "price_unit" DECIMAL,
  "status" VARCHAR(20)
);

CREATE TABLE cart (
  "id_cart" SERIAL PRIMARY KEY NOT NULL,
  "id_user" INT NOT NULL,
  "modified" DATE NOT NULL,
  "created" DATE NOT NULL
);

CREATE TABLE cart_item (
  "id_cart_item" SERIAL PRIMARY KEY NOT NULL,
  "id_produto" INT,
  "qtd" INT,
  "id_cart" INT
);

CREATE TABLE orders (
  "id_order" SERIAL PRIMARY KEY NOT NULL,
  "total" DECIMAL NOT NULL,
  "status" VARCHAR(10) NOT NULL,
  "id_user" INT NOT NULL,
  "created" DATE NOT NULL,
  "modified" DATE NOT NULL
);

CREATE TABLE orders_item (
  "id_order_item" SERIAL PRIMARY KEY NOT NULL,
  "created" DATE,
  "id_order" INT,
  "qtd" INT,
  "price" DECIMAL,
  "id_product" INT
);

CREATE TABLE tokens (
	id SERIAL PRIMARY KEY NOT NULL,
	access_token text,
	id_user int references users(id_user)
)

ALTER TABLE users ADD CONSTRAINT "FK_USERS_PERMISSION" FOREIGN KEY ("id_permission") REFERENCES permissions ("id_permission") ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE products ADD CONSTRAINT "FK_PRODUCTS_CATEGORY" FOREIGN KEY ("id_categoria") REFERENCES category ("id_category") ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE stock ADD CONSTRAINT "FK_STOCK_PRODUCTS" FOREIGN KEY ("id_produto") REFERENCES products ("id_produto") ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE cart ADD CONSTRAINT "FK_CART_USER" FOREIGN KEY ("id_user") REFERENCES users ("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE cart_item ADD CONSTRAINT "FK_CARTITEM_CART" FOREIGN KEY ("id_cart") REFERENCES cart ("id_cart") ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE cart_item ADD CONSTRAINT "FK_CARTITEM_PRODUCT" FOREIGN KEY ("id_produto") REFERENCES products ("id_produto") ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE orders ADD CONSTRAINT "FK_ORDER_USERS" FOREIGN KEY ("id_user") REFERENCES users ("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE orders_item ADD CONSTRAINT "FK_ORDERITEM_ORDER" FOREIGN KEY ("id_order") REFERENCES orders ("id_order") ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE orders_item ADD CONSTRAINT "FK_ORDERITEM_PRODUCT" FOREIGN KEY ("id_product") REFERENCES products ("id_produto") ON DELETE NO ACTION ON UPDATE NO ACTION;
