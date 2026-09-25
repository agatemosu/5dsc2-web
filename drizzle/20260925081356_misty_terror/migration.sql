CREATE TABLE `league_leaderboard` (
	`user_id` integer PRIMARY KEY,
	`wins` integer NOT NULL,
	`draws` integer NOT NULL,
	`losses` integer NOT NULL,
	`difference` integer NOT NULL,
	`points` integer NOT NULL,
	CONSTRAINT `fk_league_leaderboard_user_id_players_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `players`(`user_id`)
);
