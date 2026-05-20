import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('member', 'pharmacist', 'admin');
  CREATE TYPE "public"."enum_users_member_tier" AS ENUM('Membre', 'Privilège', 'Cercle');
  CREATE TYPE "public"."enum_profiles_concerns" AS ENUM('Imperfections', 'Rides & ridules', 'Taches', 'Rougeurs', 'Déshydratation', 'Manque d''éclat', 'Pores', 'Sensibilité');
  CREATE TYPE "public"."enum_profiles_skin_type" AS ENUM('seche', 'mixte', 'grasse', 'normale', 'sensible');
  CREATE TYPE "public"."enum_profiles_life_moment" AS ENUM('none', 'grossesse', 'postpartum', 'menopause');
  CREATE TYPE "public"."enum_profiles_sun_exposure" AS ENUM('low', 'med', 'high');
  CREATE TYPE "public"."enum_profiles_routine_habit" AS ENUM('yes', 'occ', 'no');
  CREATE TYPE "public"."enum_routines_steps_phase" AS ENUM('Matin', 'Soir');
  CREATE TYPE "public"."enum_products_inci_flag" AS ENUM('none', 'good', 'warn');
  CREATE TYPE "public"."enum_products_category" AS ENUM('Visage', 'Cheveux', 'Corps', 'Bébé', 'Compléments', 'Soins ciblés');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar,
  	"last_name" varchar,
  	"role" "enum_users_role" DEFAULT 'member' NOT NULL,
  	"member_tier" "enum_users_member_tier" DEFAULT 'Membre',
  	"consent_marketing" boolean DEFAULT false,
  	"consent_data_processing" boolean DEFAULT true,
  	"consent_accepted_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "profiles_concerns" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_profiles_concerns",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "profiles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"display_name" varchar,
  	"skin_type" "enum_profiles_skin_type",
  	"life_moment" "enum_profiles_life_moment" DEFAULT 'none',
  	"sun_exposure" "enum_profiles_sun_exposure",
  	"routine_habit" "enum_profiles_routine_habit",
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "profiles_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "diagnostics_concerns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "diagnostics" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"skin_type" varchar,
  	"life_moment" varchar,
  	"sun_exposure" varchar,
  	"routine_habit" varchar,
  	"answers" jsonb,
  	"summary" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "diagnostics_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "routines_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"phase" "enum_routines_steps_phase" NOT NULL,
  	"order" numeric DEFAULT 1,
  	"title" varchar NOT NULL,
  	"instructions" varchar,
  	"product_id" integer
  );
  
  CREATE TABLE "routines" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"name" varchar DEFAULT 'Ma routine' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "products_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "products_inci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"function" varchar,
  	"flag" "enum_products_inci_flag" DEFAULT 'none'
  );
  
  CREATE TABLE "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"brand" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"category" "enum_products_category" NOT NULL,
  	"price" varchar,
  	"size" varchar,
  	"stock" boolean DEFAULT true,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"duration_minutes" numeric,
  	"capacity" numeric DEFAULT 8,
  	"host" varchar,
  	"description" varchar,
  	"published" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "events_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"profiles_id" integer,
  	"diagnostics_id" integer,
  	"routines_id" integer,
  	"products_id" integer,
  	"events_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "profiles_concerns" ADD CONSTRAINT "profiles_concerns_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "profiles_rels" ADD CONSTRAINT "profiles_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "profiles_rels" ADD CONSTRAINT "profiles_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "diagnostics_concerns" ADD CONSTRAINT "diagnostics_concerns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."diagnostics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "diagnostics" ADD CONSTRAINT "diagnostics_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "diagnostics_rels" ADD CONSTRAINT "diagnostics_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."diagnostics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "diagnostics_rels" ADD CONSTRAINT "diagnostics_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "routines_steps" ADD CONSTRAINT "routines_steps_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "routines_steps" ADD CONSTRAINT "routines_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."routines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "routines" ADD CONSTRAINT "routines_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_tags" ADD CONSTRAINT "products_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_inci" ADD CONSTRAINT "products_inci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_profiles_fk" FOREIGN KEY ("profiles_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_diagnostics_fk" FOREIGN KEY ("diagnostics_id") REFERENCES "public"."diagnostics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_routines_fk" FOREIGN KEY ("routines_id") REFERENCES "public"."routines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "profiles_concerns_order_idx" ON "profiles_concerns" USING btree ("order");
  CREATE INDEX "profiles_concerns_parent_idx" ON "profiles_concerns" USING btree ("parent_id");
  CREATE UNIQUE INDEX "profiles_user_idx" ON "profiles" USING btree ("user_id");
  CREATE INDEX "profiles_updated_at_idx" ON "profiles" USING btree ("updated_at");
  CREATE INDEX "profiles_created_at_idx" ON "profiles" USING btree ("created_at");
  CREATE INDEX "profiles_rels_order_idx" ON "profiles_rels" USING btree ("order");
  CREATE INDEX "profiles_rels_parent_idx" ON "profiles_rels" USING btree ("parent_id");
  CREATE INDEX "profiles_rels_path_idx" ON "profiles_rels" USING btree ("path");
  CREATE INDEX "profiles_rels_products_id_idx" ON "profiles_rels" USING btree ("products_id");
  CREATE INDEX "diagnostics_concerns_order_idx" ON "diagnostics_concerns" USING btree ("_order");
  CREATE INDEX "diagnostics_concerns_parent_id_idx" ON "diagnostics_concerns" USING btree ("_parent_id");
  CREATE INDEX "diagnostics_user_idx" ON "diagnostics" USING btree ("user_id");
  CREATE INDEX "diagnostics_updated_at_idx" ON "diagnostics" USING btree ("updated_at");
  CREATE INDEX "diagnostics_created_at_idx" ON "diagnostics" USING btree ("created_at");
  CREATE INDEX "diagnostics_rels_order_idx" ON "diagnostics_rels" USING btree ("order");
  CREATE INDEX "diagnostics_rels_parent_idx" ON "diagnostics_rels" USING btree ("parent_id");
  CREATE INDEX "diagnostics_rels_path_idx" ON "diagnostics_rels" USING btree ("path");
  CREATE INDEX "diagnostics_rels_products_id_idx" ON "diagnostics_rels" USING btree ("products_id");
  CREATE INDEX "routines_steps_order_idx" ON "routines_steps" USING btree ("_order");
  CREATE INDEX "routines_steps_parent_id_idx" ON "routines_steps" USING btree ("_parent_id");
  CREATE INDEX "routines_steps_product_idx" ON "routines_steps" USING btree ("product_id");
  CREATE INDEX "routines_user_idx" ON "routines" USING btree ("user_id");
  CREATE INDEX "routines_updated_at_idx" ON "routines" USING btree ("updated_at");
  CREATE INDEX "routines_created_at_idx" ON "routines" USING btree ("created_at");
  CREATE INDEX "products_tags_order_idx" ON "products_tags" USING btree ("_order");
  CREATE INDEX "products_tags_parent_id_idx" ON "products_tags" USING btree ("_parent_id");
  CREATE INDEX "products_inci_order_idx" ON "products_inci" USING btree ("_order");
  CREATE INDEX "products_inci_parent_id_idx" ON "products_inci" USING btree ("_parent_id");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX "events_rels_order_idx" ON "events_rels" USING btree ("order");
  CREATE INDEX "events_rels_parent_idx" ON "events_rels" USING btree ("parent_id");
  CREATE INDEX "events_rels_path_idx" ON "events_rels" USING btree ("path");
  CREATE INDEX "events_rels_users_id_idx" ON "events_rels" USING btree ("users_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_profiles_id_idx" ON "payload_locked_documents_rels" USING btree ("profiles_id");
  CREATE INDEX "payload_locked_documents_rels_diagnostics_id_idx" ON "payload_locked_documents_rels" USING btree ("diagnostics_id");
  CREATE INDEX "payload_locked_documents_rels_routines_id_idx" ON "payload_locked_documents_rels" USING btree ("routines_id");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "profiles_concerns" CASCADE;
  DROP TABLE "profiles" CASCADE;
  DROP TABLE "profiles_rels" CASCADE;
  DROP TABLE "diagnostics_concerns" CASCADE;
  DROP TABLE "diagnostics" CASCADE;
  DROP TABLE "diagnostics_rels" CASCADE;
  DROP TABLE "routines_steps" CASCADE;
  DROP TABLE "routines" CASCADE;
  DROP TABLE "products_tags" CASCADE;
  DROP TABLE "products_inci" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "events_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_users_member_tier";
  DROP TYPE "public"."enum_profiles_concerns";
  DROP TYPE "public"."enum_profiles_skin_type";
  DROP TYPE "public"."enum_profiles_life_moment";
  DROP TYPE "public"."enum_profiles_sun_exposure";
  DROP TYPE "public"."enum_profiles_routine_habit";
  DROP TYPE "public"."enum_routines_steps_phase";
  DROP TYPE "public"."enum_products_inci_flag";
  DROP TYPE "public"."enum_products_category";`)
}
