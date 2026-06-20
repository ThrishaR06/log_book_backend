ALTER TABLE `doctors` DROP INDEX `doctors_email_unique`;--> statement-breakpoint
ALTER TABLE `doctors` DROP FOREIGN KEY `doctors_hospital_id_hospitals_id_fk`;
--> statement-breakpoint
ALTER TABLE `doctors` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `doctors` MODIFY COLUMN `hospital_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `doctors` MODIFY COLUMN `dob` varchar(50);--> statement-breakpoint
ALTER TABLE `doctors` MODIFY COLUMN `phone` varchar(20);--> statement-breakpoint
ALTER TABLE `doctors` ADD `full_name` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `doctors` ADD `designation` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `doctors` ADD `specialty` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `doctors` ADD `primary_hospital` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `doctors` ADD `register_no` varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE `doctors` DROP COLUMN `name`;--> statement-breakpoint
ALTER TABLE `doctors` DROP COLUMN `created_at`;--> statement-breakpoint
ALTER TABLE `doctors` DROP COLUMN `updated_at`;