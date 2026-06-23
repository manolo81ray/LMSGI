-- =====================================================================
--  TABLA DE REGISTRO `actividad` — mi_porfolio
--
--  Guarda una fila por CADA acción del panel admin (crear, editar,
--  ocultar, activar y borrar) de cualquier entidad. El dashboard la lee
--  para la tarjeta "Actividad reciente".
--
--  Por qué una tabla aparte y no deducirlo de created_at/updated_at:
--    - Las ediciones de campos y los BORRADOS no dejan rastro en la
--      propia fila (al borrar, la fila desaparece). Un registro propio
--      conserva el historial completo.
--
--  Idempotente: se puede ejecutar varias veces sin error.
--  Cómo usar:  Supabase -> SQL Editor -> New query -> pegar -> Run
-- =====================================================================

-- 1) Tabla
create table if not exists public.actividad (
  id          bigint generated always as identity primary key,
  tipo        text not null,              -- curso | proyecto | servicio | formacion | lenguaje
  accion      text not null,              -- creado | editado | ocultado | activado | borrado
  titulo      text not null,
  entidad_id  bigint,                     -- id de la fila afectada (informativo)
  fecha       timestamptz not null default now()
);

create index if not exists actividad_fecha_idx on public.actividad (fecha desc);

-- 2) RLS: lectura pública (clave publishable usa rol `public`), escritura solo admin
alter table public.actividad enable row level security;

drop policy if exists "lectura_publica"  on public.actividad;
drop policy if exists "escritura_admin"  on public.actividad;

create policy "lectura_publica" on public.actividad
  for select to public using (true);

create policy "escritura_admin" on public.actividad
  for insert to authenticated with check (true);
