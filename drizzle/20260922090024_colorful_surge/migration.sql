CREATE TABLE `matches` (
	`id` text PRIMARY KEY,
	`round_id` integer NOT NULL,
	`bracket` text,
	`status` text NOT NULL,
	`start_time` integer NOT NULL,
	`team_red_id` integer,
	`team_blue_id` integer,
	`team_red_points` integer,
	`team_blue_points` integer,
	`rundown` text NOT NULL,
	`referee_name` text,
	`osu_match_id` integer,
	CONSTRAINT `fk_matches_round_id_rounds_id_fk` FOREIGN KEY (`round_id`) REFERENCES `rounds`(`id`),
	CONSTRAINT `fk_matches_team_red_id_players_id_fk` FOREIGN KEY (`team_red_id`) REFERENCES `players`(`id`),
	CONSTRAINT `fk_matches_team_blue_id_players_id_fk` FOREIGN KEY (`team_blue_id`) REFERENCES `players`(`id`)
);
--> statement-breakpoint
ALTER TABLE `rounds` ADD `best_of` integer;