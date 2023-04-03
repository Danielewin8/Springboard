-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Modify this code to update the DB schema diagram.
-- To reset the sample schema, replace everything with
-- two dots ('..' - without quotes).

CREATE TABLE "teams" (
    "ID" int   NOT NULL,
    "name" string   NOT NULL,
    CONSTRAINT "pk_teams" PRIMARY KEY (
        "ID"
     ),
    CONSTRAINT "uc_teams_name" UNIQUE (
        "name"
    )
);

CREATE TABLE "goals" (
    "ID" int   NOT NULL,
    "player_id" int   NOT NULL,
    "match_id" int   NOT NULL,
    "goals" int   NOT NULL,
    CONSTRAINT "pk_goals" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "players" (
    "ID" int   NOT NULL,
    "name" string   NOT NULL,
    "team_id" int   NOT NULL,
    CONSTRAINT "pk_players" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "referees" (
    "ID" int   NOT NULL,
    "name" string   NOT NULL,
    CONSTRAINT "pk_referees" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "matches" (
    "ID" int   NOT NULL,
    "team_1_id" int   NOT NULL,
    "team_2_id" int   NOT NULL,
    "season_id" int   NOT NULL,
    "referee_id" int   NOT NULL,
    CONSTRAINT "pk_matches" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "season" (
    "ID" int   NOT NULL,
    "start_date" string   NOT NULL,
    "end_date" string   NOT NULL,
    CONSTRAINT "pk_season" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "results" (
    "ID" int   NOT NULL,
    "team_id" int   NOT NULL,
    "match_id" int   NOT NULL,
    "result" string   NOT NULL,
    CONSTRAINT "pk_results" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "rankings" (
    "ID" int   NOT NULL,
    "team_id" int   NOT NULL,
    "results_id" int   NOT NULL,
    CONSTRAINT "pk_rankings" PRIMARY KEY (
        "ID"
     )
);

ALTER TABLE "goals" ADD CONSTRAINT "fk_goals_player_id" FOREIGN KEY("player_id")
REFERENCES "players" ("ID");

ALTER TABLE "goals" ADD CONSTRAINT "fk_goals_match_id" FOREIGN KEY("match_id")
REFERENCES "matches" ("ID");

ALTER TABLE "players" ADD CONSTRAINT "fk_players_team_id" FOREIGN KEY("team_id")
REFERENCES "teams" ("ID");

ALTER TABLE "matches" ADD CONSTRAINT "fk_matches_team_1_id" FOREIGN KEY("team_1_id")
REFERENCES "teams" ("ID");

ALTER TABLE "matches" ADD CONSTRAINT "fk_matches_team_2_id" FOREIGN KEY("team_2_id")
REFERENCES "teams" ("ID");

ALTER TABLE "matches" ADD CONSTRAINT "fk_matches_season_id" FOREIGN KEY("season_id")
REFERENCES "season" ("ID");

ALTER TABLE "matches" ADD CONSTRAINT "fk_matches_referee_id" FOREIGN KEY("referee_id")
REFERENCES "referees" ("ID");

ALTER TABLE "results" ADD CONSTRAINT "fk_results_team_id" FOREIGN KEY("team_id")
REFERENCES "teams" ("ID");

ALTER TABLE "results" ADD CONSTRAINT "fk_results_match_id" FOREIGN KEY("match_id")
REFERENCES "matches" ("ID");

ALTER TABLE "rankings" ADD CONSTRAINT "fk_rankings_team_id" FOREIGN KEY("team_id")
REFERENCES "teams" ("ID");

ALTER TABLE "rankings" ADD CONSTRAINT "fk_rankings_results_id" FOREIGN KEY("results_id")
REFERENCES "results" ("ID");

