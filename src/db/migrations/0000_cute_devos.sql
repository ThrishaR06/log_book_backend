CREATE TABLE `doctors` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`hospital_id` bigint unsigned NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`dob` date NOT NULL,
	`phone` varchar(20) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `doctors_id` PRIMARY KEY(`id`),
	CONSTRAINT `doctors_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `hospitals` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hospitals_id` PRIMARY KEY(`id`),
	CONSTRAINT `hospitals_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `doctors` ADD CONSTRAINT `doctors_hospital_id_hospitals_id_fk` FOREIGN KEY (`hospital_id`) REFERENCES `hospitals`(`id`) ON DELETE no action ON UPDATE no action;