CREATE TABLE `weights` (
	`id` blob PRIMARY KEY NOT NULL,
	`weight` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
