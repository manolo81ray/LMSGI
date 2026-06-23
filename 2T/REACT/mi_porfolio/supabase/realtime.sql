-- =====================================================================
--  Realtime por Broadcast desde la base de datos — mi_porfolio
--
--  Hace que la web pública se actualice sola (sin refrescar) ante CUALQUIER
--  cambio del panel admin: crear, editar, OCULTAR, mostrar y BORRAR.
--
--  Por qué Broadcast y no postgres_changes:
--    postgres_changes respeta el RLS por fila, así que al ocultar/borrar una
--    fila el visitante deja de "verla" y NO recibe el aviso. Con un trigger
--    que emite un Broadcast, el aviso llega siempre. El aviso solo dice qué
--    tabla cambió (sin datos de la fila), así que no expone contenido oculto.
--
--  Idempotente: se puede ejecutar varias veces sin error.
--  Cómo usar:  Supabase -> SQL Editor -> New query -> pegar -> Run
-- =====================================================================

-- 1) Función que emite el aviso (sin datos sensibles de la fila)
create or replace function public.notificar_cambio()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform realtime.send(
    jsonb_build_object('tabla', tg_table_name, 'op', tg_op), -- payload mínimo, sin datos de fila
    'cambio',                         -- nombre del evento
    'cambios:' || tg_table_name,      -- topic = "cambios:<tabla>"
    false                             -- público: el aviso no lleva datos sensibles
  );
  return null;
end;
$$;

-- La función solo la invocan los triggers; nadie debe poder llamarla directamente
revoke execute on function public.notificar_cambio() from anon, authenticated, public;

-- 2) Un trigger por tabla que dispara el aviso en insert/update/delete
do $$
declare
  t text;
  tablas text[] := array[
    'lenguajes','cursos','formacion','servicios',
    'proyectos','descripcion','contacto'
  ];
begin
  foreach t in array tablas loop
    execute format('drop trigger if exists trg_notificar_cambio on public.%I;', t);
    execute format(
      'create trigger trg_notificar_cambio
         after insert or update or delete on public.%I
         for each row execute function public.notificar_cambio();', t);
  end loop;
end $$;
