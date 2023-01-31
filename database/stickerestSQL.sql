/*
SPECIFICATION OF THE DATABASE IN MYSQL

User has become Utilizer because User is a reserved word in pgsql
Order has become OrderBought because Order is a reserved word in pgsql
order has become ordinal_order because it is a reserved word in pgsql

THERE HAS BEEN A TRANSLATION FROM SQL FOR POSTGRESQL TO MYSQL + UNSUPPORTED ELEMENTS
FROM THE HOSTING SERVICE FOR THE DB, LIKE NO FOREIGN KEY
*/

CREATE TABLE `Utilizer` (
	`email` varchar(30) NOT NULL,
	`nickname` varchar(30) NOT NULL,
	`password` varchar(150) NOT NULL,
	`telegram` varchar(255),
	PRIMARY KEY (`email`),
	UNIQUE KEY `nickname` (`nickname`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE `Designer` (
	`email` varchar(30) NOT NULL,
	`email_payment` varchar(30) NOT NULL,
	`level` smallint NOT NULL,
	`VAT` varchar(30),
	PRIMARY KEY (`email`),
	CONSTRAINT `Designer_chk_1` CHECK (`level` >= 1 AND `level` <= 6)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;

  
CREATE TABLE `Image` (
	`ID` int NOT NULL,
	`ordinal_order` int NOT NULL,
	`image_file` varchar(150) NOT NULL,
	PRIMARY KEY (`ID`, `ordinal_order`),
	UNIQUE KEY `ID` (`ID`, `image_file`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE `WhatsappStickerPack` (
	`ID` int NOT NULL AUTO_INCREMENT,
	`nr_downloads` int NOT NULL,
	`price_digital` decimal(18,2) NOT NULL,
	`name` varchar(60) NOT NULL,
	`Designer` varchar(30) NOT NULL,
	`dt_upload` date NOT NULL,
	`nr_sold` int,
	`physical_price` decimal(18,2),
	`link` varchar(200),
	`telegram_name` varchar(150),
	PRIMARY KEY (`ID`),
	CONSTRAINT `WhatsappStickerPack_chk_1` CHECK (`nr_sold` IS NULL AND `physical_price` IS NULL OR `nr_sold` IS NOT NULL AND `physical_price` IS NOT NULL)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;

/*
    New Additions, due to changes in the project during the creation
*/

CREATE TABLE `Favorites` (
	`email` varchar(30) NOT NULL,
	`ID` int NOT NULL,
	PRIMARY KEY (`email`, `ID`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;


CREATE TABLE `Saved` (
	`email` varchar(30) NOT NULL,
	`ID` int NOT NULL,
	PRIMARY KEY (`email`, `ID`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE `Tags` (
	`ID` int NOT NULL,
	`tag` varchar(20) NOT NULL,
	PRIMARY KEY (`tag`, `ID`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE `sessions` (
	`session_id` varchar(128) COLLATE utf8mb4_bin NOT NULL,
	`expires` int unsigned NOT NULL,
	`data` mediumtext COLLATE utf8mb4_bin,
	PRIMARY KEY (`session_id`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;


/*    
    Not used at the current state of the project yet
*/

CREATE TABLE `Address` (
	`province` varchar(7) NOT NULL,
	`nation` varchar(30) NOT NULL,
	`CAP` varchar(10) NOT NULL,
	`street` varchar(60) NOT NULL,
	`city` varchar(30) NOT NULL,
	PRIMARY KEY (`province`, `nation`, `CAP`, `street`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE `InvoiceTo` (
	`Designer` varchar(30) NOT NULL,
	`province` varchar(7) NOT NULL,
	`nation` varchar(30) NOT NULL,
	`CAP` varchar(10) NOT NULL,
	`street` varchar(60) NOT NULL,
	PRIMARY KEY (`Designer`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;


CREATE TABLE `Client` (
	`email` varchar(30) NOT NULL,
	`province` varchar(7) NOT NULL,
	`nation` varchar(30) NOT NULL,
	`CAP` varchar(10) NOT NULL,
	`street` varchar(60) NOT NULL,
	PRIMARY KEY (`email`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE `OrderBought` (
	`ID` int NOT NULL,
	`date` date NOT NULL,
	`Client` varchar(30) NOT NULL,
	PRIMARY KEY (`ID`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE `PartOf` (
	`DigitalOrder` int NOT NULL,
	`WhatsappStickerPack` int NOT NULL,
	PRIMARY KEY (`DigitalOrder`, `WhatsappStickerPack`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;


CREATE TABLE `PrintingEntity` (
	`VAT` varchar(30) NOT NULL,
	`name` varchar(60) NOT NULL,
	`province` varchar(7) NOT NULL,
	`nation` varchar(30) NOT NULL,
	`CAP` varchar(10) NOT NULL,
	`street` varchar(60) NOT NULL,
	PRIMARY KEY (`VAT`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;


CREATE TABLE `PrintedBy` (
	`PhysicalOrder` int NOT NULL,
	`PrintingEntity` varchar(30) NOT NULL,
	PRIMARY KEY (`PhysicalOrder`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE `ProductOf` (
	`PhysicalOrder` int NOT NULL,
	`PhysicalStickerPack` int NOT NULL,
	PRIMARY KEY (`PhysicalOrder`, `PhysicalStickerPack`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE `ShippingCompany` (
	`acronym` varchar(10) NOT NULL,
	`name` varchar(60) NOT NULL,
	`fee` decimal(18,2) NOT NULL,
	PRIMARY KEY (`acronym`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE `ShippedBy` (
	`PhysicalOrder` int NOT NULL,
	`province` varchar(7) NOT NULL,
	`nation` varchar(30) NOT NULL,
	`CAP` varchar(10) NOT NULL,
	`street` varchar(60) NOT NULL,
	`ShippingCompany` varchar(10) NOT NULL,
	PRIMARY KEY (`PhysicalOrder`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;


CREATE TABLE `WorkIn` (
	`ShippingCompany` varchar(10) NOT NULL,
	`Nations` char(2) NOT NULL,
	PRIMARY KEY (`ShippingCompany`, `Nations`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE `PrintingCompany` (
	`VAT` varchar(30) NOT NULL,
	`pec_email` varchar(30) NOT NULL,
	PRIMARY KEY (`VAT`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE `LocalPrintingShop` (
	`VAT` varchar(30) NOT NULL,
	`phone_number` varchar(15) NOT NULL,
	PRIMARY KEY (`VAT`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;