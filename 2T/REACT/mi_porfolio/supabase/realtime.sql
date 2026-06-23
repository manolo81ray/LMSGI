-- =====================================================================
--  Activar Supabase Realtime en las tablas del porfolio
--  Permite que la web pública se actualice sola (sin refrescar) cuando
--  se edita desde el panel admin.
--
--  - REPLICA IDENTITY FULL: necesario para que los eventos UPDATE/DELETE
--    incluyan los datos suficientes para evaluar el RLS (si no, el
--    visitante podría no recibir algunos cambios).
--  - Añade cada tabla a la publicación `supabase_realtime` si no está.
--
--  Idempotente: se puede ejecutar varias veces sin error.
--  Cómo usar:  Supabase -> SQL Editor -> New query -> pegar -> Run
-- =====================================================================
do $$
declare
  t text;
  tablas text[] := array[
    'lenguajes','cursos','formacion','servicios',
    'proyectos','descripcion','contacto'
  ];
begin
  foreach t in array tablas loop
    execute format('alter table public.%I replica identity full;', t);

    if not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = t
    ) then
      execute format('alter publication supabase_realtime add table public.%I;', t);
    end if;
  end loop;
end $$;

-- Comprobación: tablas que ya emiten eventos Realtime
-- select tablename from pg_publication_tables
-- where pubname = 'supabase_realtime' and schemaname = 'public'
-- order by tablename;
