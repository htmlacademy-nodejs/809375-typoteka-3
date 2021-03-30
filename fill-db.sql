INSERT INTO categories(label)
VALUES ('Деревья'),
       ('За жизнь'),
       ('Без рамки'),
       ('Разное'),
       ('IT'),
       ('Музыка'),
       ('Кино'),
       ('Программирование'),
       ('Железо');

INSERT INTO users(email, password_hash, first_name, last_name, is_author)
VALUES ('s.shramko@gmail.com', md5('s.shramko@gmail.com'), 'Serhii', 'Shramko', true),
       ('a.pupkin@gmail.com', md5('a.pupkin@gmail.com'), 'Anton', 'Pupkin', false),
       ('d.donstkoy@gmail.com', md5('d.donstkoy@gmail.com'), 'Dmitriy', 'Donskoy', false),
       ('a.kurpatov@gmail.com', md5('a.kurpatov@gmail.com'), 'Andrey', 'Kurpatov', false),
       ('a.volga@gmail.com', md5('a.volga@gmail.com'), 'Anna', 'Volga', false);

INSERT INTO articles(user_id, title, announce, photo, published_at, full_text)
VALUES (1, 'Ёлки. История деревьев', 'Ёлки — это не просто красивое дерево. Это прочная древесина.
', null, default, null),
       (2, 'Лучше рок-музыканты 20-века', 'Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?',
        null, default, 'Это один из лучших рок-музыкантов.
. Из под его пера вышло 8 платиновых альбомов. Он написал больше 30 хитов.'),
       (3, 'Учим HTML и CSS',
        'Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.', default,
        default, 'Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.
. Программировать не настолько сложно, как об этом говорят.');

INSERT INTO articles_categories (article_id, category_id)
values (1, 2),
       (1, 1),
       (3, 3),
       (4, 1);

INSERT INTO comments(text, article_id, user_id)
VALUES ('Согласен с автором!', 1, 1),
       ('Мне кажется или я уже читал это где-то?', 1, 2),
       ('Плюсую, но слишком много буквы!', 3, 1),
       ('Планируете записать видосик на эту тему?', 3, 4),
       ('Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.', 4, 5),
       ('Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.', 4, 3);
