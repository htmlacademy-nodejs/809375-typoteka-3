-- Get a list of all categories
-- (identifier, category name)
SELECT id, label
FROM categories;

-- Get a list of categories for which at least one publication has been created
-- (identifier, category name)
SELECT id,
       label
FROM categories
         INNER JOIN articles_categories ac on categories.id = ac.category_id
GROUP BY id, label;

-- Get a list of categories with the number of publications
-- (identifier, category name, number of publications in the category)
SELECT id,
       label,
       count(ac.category_id) as number_of_publication
FROM categories
         LEFT JOIN articles_categories ac on categories.id = ac.category_id
GROUP BY id
ORDER BY number_of_publication DESC;

-- Get a list of publications (publication ID, publication title, publication announcement, publication date,
-- author's name and surname, contact email, number of comments, category names). Fresh publications first
DROP VIEW IF EXISTS article_info;
CREATE VIEW article_info AS
SELECT articles.id,
       articles.title,
       articles.announce,
       articles.published_at,
       users.first_name,
       users.last_name,
       comments_count,
       categories_labels
FROM articles
         INNER JOIN users ON articles.user_id = users.id
         INNER JOIN (
    SELECT article_id, count(article_id) as comments_count
    FROM comments
    GROUP BY article_id
) comments ON articles.id = comments.article_id
         INNER JOIN (
    SELECT articles_categories.article_id, string_agg(categories.label, ', ') as categories_labels
    FROM articles_categories
             INNER JOIN categories ON categories.id = articles_categories.category_id
    GROUP BY articles_categories.article_id
) categories ON articles.id = categories.article_id
ORDER BY articles.published_at DESC;

SELECT *
FROM article_info;


-- Get complete information for a specific publication
-- (publication ID, publication title, announcement, full publication text, publication date, image path,
-- author's name and surname, contact email, number of comments, category names)
-- Select article 3 for example
SELECT *
FROM article_info
WHERE id = 3;

-- Get a list of 5 recent comments (comment ID, publication ID, author's first and last name, comment text)
DROP VIEW IF EXISTS comment_info;
CREATE VIEW comment_info AS
SELECT comments.id as comment_id, articles.id as article_id, users.first_name, users.last_name, comments.text
FROM comments
         INNER JOIN articles on comments.article_id = articles.id
         INNER JOIN users on comments.user_id = users.id
ORDER BY comments.published_at DESC;

SELECT *
FROM comment_info
LIMIT 5;

-- Get a list of comments for a specific post (comment ID, post ID, author's first and last name, comment text).
-- New comments first;
SELECT *
FROM comment_info
WHERE article_id = 3;

-- Update the title of a specific post to "How I met the New Year"
UPDATE articles
SET title = 'Как я встретил Новый год'
WHERE id = 3;
