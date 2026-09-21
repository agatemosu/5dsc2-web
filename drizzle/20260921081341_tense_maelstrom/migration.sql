PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_rounds` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`slug` text NOT NULL UNIQUE,
	`name` text NOT NULL,
	`stage_type` text NOT NULL,
	`mappack_url` text,
	`mappool_published_at` integer
);
--> statement-breakpoint
INSERT INTO `__new_rounds`(`id`, `slug`, `name`, `stage_type`, `mappack_url`, `mappool_published_at`) SELECT `id`, `slug`, `name`, `stage_type`, `mappack_url`, `mappool_published_at` FROM `rounds`;--> statement-breakpoint
DROP TABLE `rounds`;--> statement-breakpoint
ALTER TABLE `__new_rounds` RENAME TO `rounds`;--> statement-breakpoint
PRAGMA foreign_keys=ON;