CREATE TABLE `discord_users` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`global_name` text,
	`avatar` text
);
--> statement-breakpoint
CREATE TABLE `osu_users` (
	`id` integer PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`global_rank` integer NOT NULL,
	`country_rank` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `players` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`registered_at` integer NOT NULL,
	`availability` text NOT NULL,
	`seed` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `players_user_id_unique` ON `players` (`user_id`);--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`osu_id` integer NOT NULL,
	`discord_id` text,
	FOREIGN KEY (`osu_id`) REFERENCES `osu_users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`discord_id`) REFERENCES `discord_users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_osu_id_unique` ON `users` (`osu_id`);