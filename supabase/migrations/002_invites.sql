-- 002_invites.sql
-- "Try a session together" invite links for duets/trios/groups.
-- Additive only. Anon has NO direct table access — all reads/writes go
-- through SECURITY DEFINER functions that expose only safe fields.

create extension if not exists pgcrypto;

create table if not exists public.invites (
  id uuid primary key default gen_random_uuid(),
  token text unique not null,
  host_name text not null,
  host_email text not null,
  session_type text not null check (session_type in ('duet','trio','group')),
  payment_mode text not null check (payment_mode in ('host_pays','split')),
  message text,
  status text not null default 'open' check (status in ('open','claimed','expired')),
  claimed_by_name text,
  claimed_by_email text,
  claimed_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.invites enable row level security;
-- No policies on purpose: anon/authenticated cannot touch the table
-- directly. The portal (service role) bypasses RLS for Sara's visibility.

-- ── Create an invite. Returns the share token. ─────────────────────
create or replace function public.create_invite(
  p_host_name text,
  p_host_email text,
  p_session_type text,
  p_payment_mode text,
  p_message text default null
) returns text
language plpgsql security definer set search_path = public as $$
declare
  v_token text;
  v_first text;
  v_last text;
begin
  if p_host_name is null or length(trim(p_host_name)) < 1 then
    raise exception 'Name is required.';
  end if;
  if p_host_email is null or position('@' in p_host_email) = 0 then
    raise exception 'A valid email is required.';
  end if;
  if p_session_type not in ('duet','trio','group') then
    raise exception 'Invalid session type.';
  end if;
  if p_payment_mode not in ('host_pays','split') then
    raise exception 'Invalid payment mode.';
  end if;

  v_token := encode(gen_random_bytes(9), 'hex');
  v_first := split_part(trim(p_host_name), ' ', 1);
  v_last  := nullif(trim(substr(trim(p_host_name), length(v_first) + 1)), '');

  insert into invites (token, host_name, host_email, session_type, payment_mode, message)
  values (v_token, trim(p_host_name), lower(trim(p_host_email)),
          p_session_type, p_payment_mode,
          nullif(trim(coalesce(p_message, '')), ''));

  -- Surface the host in Sara's lead queue
  insert into leads (first_name, last_name, email, source, notes)
  values (v_first, v_last, lower(trim(p_host_email)), 'website',
          'Created a try-together invite — ' || p_session_type ||
          ', ' || case p_payment_mode when 'host_pays' then 'host pays both'
                                      else 'each pays their own' end ||
          '. Invite token: ' || v_token);

  return v_token;
end $$;

-- ── Read an invite by token (safe fields only). ────────────────────
create or replace function public.get_invite(p_token text)
returns table (
  host_name text,
  session_type text,
  payment_mode text,
  status text,
  message text
)
language sql security definer set search_path = public as $$
  select
    i.host_name,
    i.session_type,
    i.payment_mode,
    case
      when i.status = 'claimed' then 'claimed'
      when i.created_at < now() - interval '30 days' then 'expired'
      else i.status
    end as status,
    i.message
  from invites i
  where i.token = p_token;
$$;

-- ── Claim an invite (the friend accepting). ─────────────────────────
create or replace function public.claim_invite(
  p_token text,
  p_name text,
  p_email text,
  p_phone text default null
) returns text
language plpgsql security definer set search_path = public as $$
declare
  v_invite invites%rowtype;
  v_first text;
  v_last text;
begin
  if p_name is null or length(trim(p_name)) < 1 then
    raise exception 'Name is required.';
  end if;
  if p_email is null or position('@' in p_email) = 0 then
    raise exception 'A valid email is required.';
  end if;

  select * into v_invite from invites where token = p_token for update;
  if not found then
    raise exception 'Invite not found.';
  end if;
  if v_invite.status = 'claimed' then
    return 'claimed';
  end if;
  if v_invite.created_at < now() - interval '30 days' then
    return 'expired';
  end if;

  update invites
  set status = 'claimed',
      claimed_by_name = trim(p_name),
      claimed_by_email = lower(trim(p_email)),
      claimed_at = now()
  where token = p_token;

  v_first := split_part(trim(p_name), ' ', 1);
  v_last  := nullif(trim(substr(trim(p_name), length(v_first) + 1)), '');

  insert into leads (first_name, last_name, email, phone, source, notes)
  values (v_first, v_last, lower(trim(p_email)), nullif(trim(coalesce(p_phone,'')),''),
          'website',
          'Accepted ' || v_invite.host_name || '''s try-together invite — ' ||
          v_invite.session_type || ', ' ||
          case v_invite.payment_mode when 'host_pays' then 'host pays both'
                                     else 'each pays their own' end ||
          '. Invite token: ' || p_token);

  return 'ok';
end $$;

-- Functions are the only anon surface
revoke all on function public.create_invite(text,text,text,text,text) from public;
revoke all on function public.get_invite(text) from public;
revoke all on function public.claim_invite(text,text,text,text) from public;
grant execute on function public.create_invite(text,text,text,text,text) to anon, authenticated;
grant execute on function public.get_invite(text) to anon, authenticated;
grant execute on function public.claim_invite(text,text,text,text) to anon, authenticated;
