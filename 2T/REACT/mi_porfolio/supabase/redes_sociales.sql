-- =====================================================================
--  TABLA `redes_sociales` — mi_porfolio
--
--  Una fila = una red social (YouTube, LinkedIn, Instagram, Gmail...).
--  Se gestiona desde el panel admin (crear, editar, ocultar, borrar) y se
--  muestra en la página pública de Contacto.
--
--  Antes esto vivía en una sola fila de la tabla `contacto`
--  (nombre = 'Redes Sociales') con dos arrays paralelos: `tecnologias`
--  (SVGs) y `URL` (enlaces), emparejados por POSICIÓN contra un array
--  hardcodeado en el código (networkNames). Añadir o quitar una red
--  obligaba a tocar código. Con una tabla propia cada red es una fila
--  independiente con su nombre, icono, enlace, orden y visibilidad.
--
--  Idempotente: se puede ejecutar varias veces sin error.
--  Cómo usar:  Supabase -> SQL Editor -> New query -> pegar -> Run
-- =====================================================================

-- 1) Tabla
create table if not exists public.redes_sociales (
  id          bigint generated always as identity primary key,
  nombre      text not null,                 -- "YouTube", "LinkedIn"...
  icono       text not null,                 -- código SVG del icono
  url         text not null,                 -- enlace al perfil
  orden       int  not null default 0,       -- orden de aparición en la web
  visible     boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists redes_sociales_orden_idx on public.redes_sociales (orden asc, id asc);

-- 2) RLS: lectura pública solo de las visibles (clave publishable usa rol
--    `public`), escritura solo admin autenticado.
alter table public.redes_sociales enable row level security;

drop policy if exists "lectura_publica" on public.redes_sociales;
drop policy if exists "escritura_admin" on public.redes_sociales;

create policy "lectura_publica" on public.redes_sociales
  for select to public using (visible = true);

create policy "escritura_admin" on public.redes_sociales
  for all to authenticated using (true) with check (true);

-- 3) Trigger de realtime (avisa a la web pública de cualquier cambio).
--    Reutiliza la función public.notificar_cambio() de supabase/realtime.sql.
drop trigger if exists trg_notificar_cambio on public.redes_sociales;
create trigger trg_notificar_cambio
  after insert or update or delete on public.redes_sociales
  for each row execute function public.notificar_cambio();
