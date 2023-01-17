-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Modify this code to update the DB schema diagram.
-- To reset the sample schema, replace everything with
-- two dots ('..' - without quotes).

CREATE TABLE "doctor" (
    "ID" int   NOT NULL,
    "name" string   NOT NULL,
    "profession" string   NOT NULL,
    CONSTRAINT "pk_doctor" PRIMARY KEY (
        "ID"
     ),
    CONSTRAINT "uc_doctor_profession" UNIQUE (
        "profession"
    )
);

CREATE TABLE "patients" (
    "ID" int   NOT NULL,
    "name" string   NOT NULL,
    CONSTRAINT "pk_patients" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "visits" (
    "ID" int   NOT NULL,
    "doctor_id" int   NOT NULL,
    "patient_id" int   NOT NULL,
    "date" int   NOT NULL,
    CONSTRAINT "pk_visits" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "diseases" (
    "ID" int   NOT NULL,
    "name" string   NOT NULL,
    CONSTRAINT "pk_diseases" PRIMARY KEY (
        "ID"
     ),
    CONSTRAINT "uc_diseases_name" UNIQUE (
        "name"
    )
);

CREATE TABLE "diagnoses" (
    "ID" string   NOT NULL,
    "visit_id" int   NOT NULL,
    "diseases_id" int   NOT NULL,
    CONSTRAINT "pk_diagnoses" PRIMARY KEY (
        "ID"
     )
);

ALTER TABLE "doctor" ADD CONSTRAINT "fk_doctor_ID" FOREIGN KEY("ID")
REFERENCES "visits" ("doctor_id");

ALTER TABLE "patients" ADD CONSTRAINT "fk_patients_ID" FOREIGN KEY("ID")
REFERENCES "visits" ("patient_id");

ALTER TABLE "visits" ADD CONSTRAINT "fk_visits_ID" FOREIGN KEY("ID")
REFERENCES "diagnoses" ("visit_id");

ALTER TABLE "diseases" ADD CONSTRAINT "fk_diseases_ID" FOREIGN KEY("ID")
REFERENCES "diagnoses" ("diseases_id");

