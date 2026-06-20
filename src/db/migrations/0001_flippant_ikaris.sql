CREATE TABLE `subscriptions` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`doctor_id` bigint NOT NULL,
	`plan` varchar(50) NOT NULL,
	`status` varchar(20) NOT NULL,
	`start_date` timestamp DEFAULT (now()),
	`end_date` timestamp,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `subscriptions_id` PRIMARY KEY(`id`)
);
