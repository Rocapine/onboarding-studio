alter table "public"."team_memberships" drop constraint "team_memberships_team_id_fkey";

alter table "public"."team_memberships" drop constraint "team_memberships_user_id_fkey";

alter table "public"."team_memberships" add column "created_at" timestamp with time zone not null default now();

alter table "public"."team_memberships" add constraint "team_memberships_team_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE not valid;

alter table "public"."team_memberships" validate constraint "team_memberships_team_id_fkey";

alter table "public"."team_memberships" add constraint "team_memberships_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."team_memberships" validate constraint "team_memberships_user_id_fkey";

create policy "Enable insert for users based on user_id"
on "public"."profiles"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = id));



