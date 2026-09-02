CREATE TABLE `beatmaps` (
	`id` integer PRIMARY KEY,
	`beatmapset_id` integer NOT NULL,
	`circle_size` real NOT NULL,
	`approach_rate` real NOT NULL,
	`overall_difficulty` real NOT NULL,
	`length` integer NOT NULL,
	`bpm` real NOT NULL,
	`version` text NOT NULL,
	CONSTRAINT `fk_beatmaps_beatmapset_id_beatmapsets_id_fk` FOREIGN KEY (`beatmapset_id`) REFERENCES `beatmapsets`(`id`)
);
--> statement-breakpoint
CREATE TABLE `beatmapsets` (
	`id` integer PRIMARY KEY,
	`artist` text NOT NULL,
	`creator` text NOT NULL,
	`title` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `mappools` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`round_id` integer NOT NULL,
	`slot_name` text NOT NULL,
	`slot_index` integer NOT NULL,
	`beatmap_id` integer NOT NULL,
	`custom` integer DEFAULT false NOT NULL,
	`suggestor` text NOT NULL,
	`pooler_notes` text NOT NULL,
	`star_rating` real NOT NULL,
	CONSTRAINT `fk_mappools_round_id_rounds_id_fk` FOREIGN KEY (`round_id`) REFERENCES `rounds`(`id`),
	CONSTRAINT `fk_mappools_beatmap_id_beatmaps_id_fk` FOREIGN KEY (`beatmap_id`) REFERENCES `beatmaps`(`id`),
	CONSTRAINT `mappools_round_id_slot_name_slot_index_unique` UNIQUE(`round_id`,`slot_name`,`slot_index`)
);
--> statement-breakpoint
CREATE TABLE `qualifier_rooms` (
	`id` text PRIMARY KEY,
	`start_time` integer NOT NULL,
	`mp_link_id` integer
);
--> statement-breakpoint
CREATE TABLE `rounds` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`slug` text NOT NULL UNIQUE,
	`name` text NOT NULL,
	`mappack_url` text,
	`mappool_published_at` integer
);
--> statement-breakpoint
ALTER TABLE `players` ADD `qualifier_room_id` text REFERENCES qualifier_rooms(id);