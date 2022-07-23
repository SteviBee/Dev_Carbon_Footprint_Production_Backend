\echo 'Delete and recreate dev-carbon db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE dev_carbon;
CREATE DATABASE dev_carbon;
\connect dev_carbon

\i dev-carbon-schema.sql
\i dev-carbon-seed.sql

\echo 'Delete and recreate dev-carbon_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE dev_carbon_test;
CREATE DATABASE dev_carbon_test;
\connect dev_carbon_test

\i dev-carbon-schema.sql
