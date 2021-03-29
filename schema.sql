DROP TABLE IF EXISTS articles_categories;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    id            INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email         VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name    VARCHAR(50)  NOT NULL,
    last_name     VARCHAR(50)  NOT NULL,
    is_author     BOOLEAN      NOT NULL,
    avatar        VARCHAR(255)
);


CREATE TABLE categories
(
    id    INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    label VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE articles
(
    id           INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id      INTEGER      NOT NULL,
    title        VARCHAR(250) NOT NULL UNIQUE,
    announce     VARCHAR(250) NOT NULL,
    photo        VARCHAR(250),
    published_at timestamptz  NOT NULL DEFAULT now(),
    full_text    VARCHAR(1000),

    FOREIGN KEY (user_id) REFERENCES users (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE comments
(
    id           INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    text         VARCHAR(1000),
    published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    article_id   INTEGER     NOT NULL,
    user_id      INTEGER     NOT NULL,

    FOREIGN KEY (article_id) REFERENCES articles (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    FOREIGN KEY (user_id) REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE articles_categories
(
    article_id  INTEGER NOT NULL,
    category_id INTEGER NOT NULL,

    CONSTRAINT articles_categories_pk PRIMARY KEY (article_id, category_id),
    FOREIGN KEY (article_id) REFERENCES articles (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
