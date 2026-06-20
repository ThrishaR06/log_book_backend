CREATE TABLE `templates` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`doctor_id` bigint NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `templates_id` PRIMARY KEY(`id`)
);
