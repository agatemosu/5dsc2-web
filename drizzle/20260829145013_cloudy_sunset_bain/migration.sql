PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_players` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`user_id` integer NOT NULL UNIQUE,
	`registered_at` integer NOT NULL,
	`availability` text NOT NULL,
	`seed` integer,
	CONSTRAINT `players_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
INSERT INTO `__new_players`(`id`, `user_id`, `registered_at`, `availability`, `seed`) SELECT `id`, `user_id`, `registered_at`, `availability`, `seed` FROM `players`;--> statement-breakpoint
DROP TABLE `players`;--> statement-breakpoint
ALTER TABLE `__new_players` RENAME TO `players`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`osu_id` integer NOT NULL UNIQUE,
	`discord_id` text,
	CONSTRAINT `users_osu_id_osu_users_id_fk` FOREIGN KEY (`osu_id`) REFERENCES `osu_users`(`id`),
	CONSTRAINT `users_discord_id_discord_users_id_fk` FOREIGN KEY (`discord_id`) REFERENCES `discord_users`(`id`)
);
--> statement-breakpoint
INSERT INTO `__new_users`(`id`, `osu_id`, `discord_id`) SELECT `id`, `osu_id`, `discord_id` FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
DROP INDEX IF EXISTS `players_user_id_unique`;--> statement-breakpoint
DROP INDEX IF EXISTS `users_osu_id_unique`;