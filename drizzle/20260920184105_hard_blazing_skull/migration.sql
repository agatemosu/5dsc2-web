PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_players` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`user_id` integer NOT NULL UNIQUE,
	`registered_at` integer NOT NULL,
	`availability` text NOT NULL,
	`qualifier_room_id` text,
	`seed` integer,
	CONSTRAINT `players_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_players_qualifier_room_id_qualifier_rooms_id_fk` FOREIGN KEY (`qualifier_room_id`) REFERENCES `qualifier_rooms`(`id`) ON UPDATE CASCADE ON DELETE SET NULL
);
--> statement-breakpoint
INSERT INTO `__new_players`(`id`, `user_id`, `registered_at`, `availability`, `qualifier_room_id`, `seed`) SELECT `id`, `user_id`, `registered_at`, `availability`, `qualifier_room_id`, `seed` FROM `players`;--> statement-breakpoint
DROP TABLE `players`;--> statement-breakpoint
ALTER TABLE `__new_players` RENAME TO `players`;--> statement-breakpoint
PRAGMA foreign_keys=ON;