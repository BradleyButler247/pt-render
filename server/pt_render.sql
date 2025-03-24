\echo 'Delete and recreate porttracker db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE pt_render;
CREATE DATABASE pt_render;
\connect pt_render

\i pt_render-schema.sql
\i pt_render-seed.sql

\echo 'Delete and recreate porttracker_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE pt_render_test;
CREATE DATABASE pt_render_test;
\connect pt_render_test

\i pt_render-schema.sql

