CREATE TABLE `iv_fluid_masters` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`doctor_id` bigint NOT NULL,
	`fluid_name` varchar(255) NOT NULL,
	`default_rate` varchar(100),
	`notes` text,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `iv_fluid_masters_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `master_categories` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `master_categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `medication_masters` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`medication_name` varchar(255) NOT NULL,
	`route` varchar(50),
	`frequency` varchar(50),
	`doctor_id` bigint NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `medication_masters_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`doctor_id` int NOT NULL,
	`session_id` varchar(255) NOT NULL,
	`expires_at` timestamp NOT NULL,
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `surgery_clinical_details` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`surgery_id` bigint NOT NULL,
	`diagnosis` text,
	`operative_findings` text,
	`procedure_details` text,
	`blood_loss` text,
	`specimens` text,
	`additional_notes` text,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `surgery_clinical_details_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `template_custom_fields` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`template_id` bigint NOT NULL,
	`field_label` varchar(255) NOT NULL,
	`field_type` varchar(100) NOT NULL,
	`field_options` text,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `template_custom_fields_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `templates` ADD `category_id` bigint NOT NULL;--> statement-breakpoint
ALTER TABLE `templates` ADD `procedure_name` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `templates` ADD `diagnosis_template` text;--> statement-breakpoint
ALTER TABLE `templates` ADD `intraoperative_findings` text;--> statement-breakpoint
ALTER TABLE `templates` ADD `procedure_details_template` text;--> statement-breakpoint
ALTER TABLE `master_presets` ADD `category_id` bigint;--> statement-breakpoint
ALTER TABLE `templates` DROP COLUMN `category`;