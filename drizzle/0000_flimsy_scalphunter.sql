CREATE TABLE `bodyInfos` (
	`id` blob PRIMARY KEY NOT NULL,
	`weight` integer,
	`fatRate` integer,
	`recorded_at` text DEFAULT CURRENT_TIMESTAMP,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
