-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Modify this code to update the DB schema diagram.
-- To reset the sample schema, replace everything with
-- two dots ('..' - without quotes).

CREATE TABLE "region" (
    "ID" int   NOT NULL,
    "name" string   NOT NULL,
    CONSTRAINT "pk_region" PRIMARY KEY (
        "ID"
     ),
    CONSTRAINT "uc_region_name" UNIQUE (
        "name"
    )
);

CREATE TABLE "users" (
    "ID" int   NOT NULL,
    "username" string   NOT NULL,
    "password" string   NOT NULL,
    CONSTRAINT "pk_users" PRIMARY KEY (
        "ID"
     ),
    CONSTRAINT "uc_users_username" UNIQUE (
        "username"
    ),
    CONSTRAINT "uc_users_password" UNIQUE (
        "password"
    )
);

CREATE TABLE "posts" (
    "ID" int   NOT NULL,
    "title" string   NOT NULL,
    "text" string   NOT NULL,
    "location" string   NOT NULL,
    "users_id" int   NOT NULL,
    "region_id" int   NOT NULL,
    "category_id" int   NOT NULL,
    CONSTRAINT "pk_posts" PRIMARY KEY (
        "ID"
     ),
    CONSTRAINT "uc_posts_location" UNIQUE (
        "location"
    )
);

CREATE TABLE "category" (
    "ID" int   NOT NULL,
    "name" string   NOT NULL,
    CONSTRAINT "pk_category" PRIMARY KEY (
        "ID"
     ),
    CONSTRAINT "uc_category_name" UNIQUE (
        "name"
    )
);

ALTER TABLE "posts" ADD CONSTRAINT "fk_posts_users_id" FOREIGN KEY("users_id")
REFERENCES "users" ("ID");

ALTER TABLE "posts" ADD CONSTRAINT "fk_posts_region_id" FOREIGN KEY("region_id")
REFERENCES "region" ("ID");

ALTER TABLE "posts" ADD CONSTRAINT "fk_posts_category_id" FOREIGN KEY("category_id")
REFERENCES "category" ("ID");

