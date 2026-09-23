CREATE TABLE `scores` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`round_id` integer NOT NULL,
	`event_id` integer NOT NULL,
	`player_id` integer NOT NULL,
	`pick` text NOT NULL,
	`score` integer NOT NULL,
	`accuracy` real NOT NULL,
	`grade` text NOT NULL,
	`mods_bitset` integer NOT NULL,
	CONSTRAINT `fk_scores_round_id_rounds_id_fk` FOREIGN KEY (`round_id`) REFERENCES `rounds`(`id`),
	CONSTRAINT `fk_scores_player_id_players_id_fk` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`),
	CONSTRAINT `scores_event_id_player_id_unique` UNIQUE(`event_id`,`player_id`)
);
