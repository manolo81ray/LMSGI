-- =====================================================================
--  POLÍTICAS RLS — mi_porfolio  (versión EN PRODUCCIÓN)
--  Modelo de seguridad:
--    * Visitantes (publishable / anon key)  -> SOLO LECTURA
--        - Tablas con `visible`: solo ven filas con visible = true
--        - Tablas sin `visible`: ven todas las filas (contenido público)
--    * Admin (authenticated, login email/password) -> LEE TODO + ESCRIBE
--
--  NOTA: la lectura pública usa el rol `public` (no `anon`). Con la clave
--  nueva `sb_publishable_...` las políticas `to anon` devolvían [] (deny
--  silencioso). `to public` cubre anon sin depender del mapeo de la clave.
--
--  Script idempotente: se puede ejecutar varias veces sin error.
--  Cómo usar:  Supabase -> SQL Editor -> New query -> pegar -> Run
-- =====================================================================


-- ─────────────────────────────────────────────────────────────────────
-- GRUPO 1: tablas con columna `visible`
--   public  -> SELECT solo de filas visibles
--   authenticated -> lectura total (incluye ocultas) + escritura total
-- ─────────────────────────────────────────────────────────────────────
do $$
declare
  t text;
  tablas_con_visible text[] := array[
    'lenguajes','cursos','formacion','servicios','proyectos'
  ];
begin
  foreach t in array tablas_con_visible loop

    execute format('alter table public.%I enable row level security;', t);

    execute format('drop policy if exists "lectura_publica_visible" on public.%I;', t);
    execute format('drop policy if exists "lectura_admin"           on public.%I;', t);
    execute format('drop policy if exists "escritura_admin"         on public.%I;', t);

    -- Lectura pública: cualquiera lee solo filas visibles
    execute format($f$
      create policy "lectura_publica_visible" on public.%I
        for select to public using (visible = true);
    $f$, t);

    -- Admin: lee TODAS las filas, también las ocultas
    execute format($f$
      create policy "lectura_admin" on public.%I
        for select to authenticated using (true);
    $f$, t);

    -- Admin: insertar / actualizar / borrar
    execute format($f$
      create policy "escritura_admin" on public.%I
        for all to authenticated using (true) with check (true);
    $f$, t);

  end loop;
end $$;


-- ─────────────────────────────────────────────────────────────────────
-- GRUPO 2: tablas SIN columna `visible` (contenido siempre público)
--   public -> SELECT de todas las filas
--   authenticated -> escritura total
-- ─────────────────────────────────────────────────────────────────────
do $$
declare
  t text;
  tablas_publicas text[] := array['contacto','descripcion'];
begin
  foreach t in array tablas_publicas loop

    execute format('alter table public.%I enable row level security;', t);

    execute format('drop policy if exists "lectura_publica"  on public.%I;', t);
    execute format('drop policy if exists "escritura_admin"  on public.%I;', t);

    execute format($f$
      create policy "lectura_publica" on public.%I
        for select to public using (true);
    $f$, t);

    execute format($f$
      create policy "escritura_admin" on public.%I
        for all to authenticated using (true) with check (true);
    $f$, t);

  end loop;
end $$;


-- =====================================================================
-- COMPROBACIÓN (opcional): lista las políticas activas por tabla
-- =====================================================================
-- select tablename, policyname, roles, cmd
-- from pg_policies
-- where schemaname = 'public'
--   and tablename in ('lenguajes','cursos','formacion','servicios',
--                     'proyectos','contacto','descripcion')
-- order by tablename, policyname;
