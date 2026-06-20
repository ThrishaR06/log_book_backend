CREATE TABLE `surgeries` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`doctor_id` bigint NOT NULL,
	`hospital_id` bigint NOT NULL,
	`template_id` bigint NOT NULL,
	`surgery_date` date NOT NULL,
	`earnings` decimal(10,2) NOT NULL,
	`notes` text,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `surgeries_id` PRIMARY KEY(`id`)
);
