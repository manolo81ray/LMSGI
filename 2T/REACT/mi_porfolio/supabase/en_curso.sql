-- =====================================================================
--  COLUMNA `en_curso` — mi_porfolio
--
--  Permite marcar desde el panel admin si una FORMACIÓN o un CURSO está
--  "En curso" (badge azul pulsante en la web) o "Completado" (sin badge),
--  sin tener que tocar código.
--
--  Antes esto estaba hardcodeado:
--    - Formación: solo salía el badge si el nombre contenía
--      "administración de sistemas informáticos de red".
--    - Cursos: salía SIEMPRE.
--
--  Por defecto las filas nuevas se crean como "En curso" (true).
--
--  Idempotente: se puede ejecutar varias veces sin error.
--  Cómo usar:  Supabase -> SQL Editor -> New query -> pegar -> Run
-- =====================================================================

alter table public.formacion
  add column if not exists en_curso boolean not null default true;

alter table public.cursos
  add column if not exists en_curso boolean not null default true;
