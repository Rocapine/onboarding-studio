alter table "public"."deployments" add constraint "deployments_created_by_fkey1" FOREIGN KEY (created_by) REFERENCES profiles(id) not valid;

alter table "public"."deployments" validate constraint "deployments_created_by_fkey1";


