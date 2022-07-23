-- test users have the password "password"

INSERT INTO users (username, password)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q');

INSERT INTO actions (action,
                       co2e,
                       co2e_units,
                       type)
VALUES ('Use less memory', 0.05, "kg",
        'memory'),
        ('Use less storage', 0.10, "kg",
        'storage'),
        ('Use less CPU', 0.007, "kg",
        'cpu'),
        ('promote metric reviews', 0.00000002, "kg",
        'other');

 