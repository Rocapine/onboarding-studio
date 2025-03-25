drop policy "User can see their own projects only." on "public"."projects";

drop policy "User can insert projects." on "public"."projects";

revoke delete on table "public"."team_members" from "anon";

revoke insert on table "public"."team_members" from "anon";

revoke references on table "public"."team_members" from "anon";

revoke select on table "public"."team_members" from "anon";

revoke trigger on table "public"."team_members" from "anon";

revoke truncate on table "public"."team_members" from "anon";

revoke update on table "public"."team_members" from "anon";

revoke delete on table "public"."team_members" from "authenticated";

revoke insert on table "public"."team_members" from "authenticated";

revoke references on table "public"."team_members" from "authenticated";

revoke select on table "public"."team_members" from "authenticated";

revoke trigger on table "public"."team_members" from "authenticated";

revoke truncate on table "public"."team_members" from "authenticated";

revoke update on table "public"."team_members" from "authenticated";

revoke delete on table "public"."team_members" from "service_role";

revoke insert on table "public"."team_members" from "service_role";

revoke references on table "public"."team_members" from "service_role";

revoke select on table "public"."team_members" from "service_role";

revoke trigger on table "public"."team_members" from "service_role";

revoke truncate on table "public"."team_members" from "service_role";

revoke update on table "public"."team_members" from "service_role";

alter table "public"."team_members" drop constraint "team_members_created_by_fkey";

alter table "public"."team_members" drop constraint "team_members_member_id_fkey";

alter table "public"."team_members" drop constraint "team_members_team_id_fkey";

alter table "public"."team_members" drop constraint "team_members_pkey";

drop index if exists "public"."team_members_pkey";

drop table "public"."team_members";

create table "public"."profiles" (
    "id" uuid not null,
    "email" text
);


alter table "public"."profiles" enable row level security;

create table "public"."team_memberships" (
    "team_id" uuid not null,
    "user_id" uuid not null
);


alter table "public"."team_memberships" enable row level security;

alter table "public"."projects" alter column "team_id" set not null;

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX team_memberships_pkey ON public.team_memberships USING btree (team_id, user_id);

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."team_memberships" add constraint "team_memberships_pkey" PRIMARY KEY using index "team_memberships_pkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."team_memberships" add constraint "team_memberships_team_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(id) not valid;

alter table "public"."team_memberships" validate constraint "team_memberships_team_id_fkey";

alter table "public"."team_memberships" add constraint "team_memberships_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) not valid;

alter table "public"."team_memberships" validate constraint "team_memberships_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$function$
;

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

grant delete on table "public"."team_memberships" to "anon";

grant insert on table "public"."team_memberships" to "anon";

grant references on table "public"."team_memberships" to "anon";

grant select on table "public"."team_memberships" to "anon";

grant trigger on table "public"."team_memberships" to "anon";

grant truncate on table "public"."team_memberships" to "anon";

grant update on table "public"."team_memberships" to "anon";

grant delete on table "public"."team_memberships" to "authenticated";

grant insert on table "public"."team_memberships" to "authenticated";

grant references on table "public"."team_memberships" to "authenticated";

grant select on table "public"."team_memberships" to "authenticated";

grant trigger on table "public"."team_memberships" to "authenticated";

grant truncate on table "public"."team_memberships" to "authenticated";

grant update on table "public"."team_memberships" to "authenticated";

grant delete on table "public"."team_memberships" to "service_role";

grant insert on table "public"."team_memberships" to "service_role";

grant references on table "public"."team_memberships" to "service_role";

grant select on table "public"."team_memberships" to "service_role";

grant trigger on table "public"."team_memberships" to "service_role";

grant truncate on table "public"."team_memberships" to "service_role";

grant update on table "public"."team_memberships" to "service_role";

create policy "Allow selecting profiles"
on "public"."profiles"
as permissive
for select
to public
using ((auth.uid() IS NOT NULL));


create policy "Users can see teammates' profiles"
on "public"."profiles"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM (team_memberships tm1
     JOIN team_memberships tm2 ON ((tm1.team_id = tm2.team_id)))
  WHERE ((tm1.user_id = auth.uid()) AND (tm2.user_id = profiles.id)))));


create policy "Users can see their own profile"
on "public"."profiles"
as permissive
for select
to public
using ((auth.uid() = id));


create policy "User can see their own projects."
on "public"."projects"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM team_memberships tm
  WHERE ((tm.team_id = projects.team_id) AND (tm.user_id = auth.uid())))));


create policy "Admins can add members to their teams"
on "public"."team_memberships"
as permissive
for insert
to public
with check (((EXISTS ( SELECT 1
   FROM team_memberships tm
  WHERE ((tm.team_id = team_memberships.team_id) AND (tm.user_id = auth.uid())))) OR (EXISTS ( SELECT 1
   FROM teams
  WHERE ((teams.id = team_memberships.team_id) AND (teams.created_by = auth.uid()))))));


create policy "Admins can remove members from their teams"
on "public"."team_memberships"
as permissive
for delete
to public
using ((EXISTS ( SELECT 1
   FROM team_memberships tm
  WHERE ((tm.team_id = team_memberships.team_id) AND (tm.user_id = auth.uid())))));


create policy "Membership is public"
on "public"."team_memberships"
as permissive
for select
to public
using (true);


create policy "Only owners can delete teams"
on "public"."teams"
as permissive
for delete
to public
using ((EXISTS ( SELECT 1
   FROM team_memberships
  WHERE ((team_memberships.team_id = teams.id) AND (team_memberships.user_id = auth.uid()) AND (teams.created_by = auth.uid())))));


create policy "Owners or admins can update teams"
on "public"."teams"
as permissive
for update
to public
using ((EXISTS ( SELECT 1
   FROM team_memberships
  WHERE ((team_memberships.team_id = teams.id) AND (team_memberships.user_id = auth.uid()) AND (teams.created_by = auth.uid())))));


create policy "Team editor"
on "public"."teams"
as permissive
for all
to public
using ((( SELECT auth.uid() AS uid) = created_by))
with check ((( SELECT auth.uid() AS uid) = created_by));


create policy "Users can create teams"
on "public"."teams"
as permissive
for insert
to public
with check ((auth.uid() IS NOT NULL));


create policy "Users can see their teams"
on "public"."teams"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM team_memberships
  WHERE ((team_memberships.team_id = teams.id) AND (team_memberships.user_id = auth.uid())))));


create policy "User can insert projects."
on "public"."projects"
as permissive
for insert
to public
with check (((( SELECT auth.uid() AS uid) = created_by) AND (EXISTS ( SELECT 1
   FROM team_memberships tm
  WHERE ((tm.team_id = projects.team_id) AND (tm.user_id = auth.uid()))))));



