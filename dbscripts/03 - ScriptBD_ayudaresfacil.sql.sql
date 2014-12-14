/*
SQLyog Enterprise - MySQL GUI v8.05 
MySQL - 5.6.16 : Database - ayudaresfacil
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

USE `ayudaresfacil2`;

/*Table structure for table `action` */

DROP TABLE IF EXISTS `action`;

CREATE TABLE `action` (
  `action_id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `description` varchar(50) NOT NULL,
  PRIMARY KEY (`action_id`),
  UNIQUE KEY `UQ_SocialNetwork_Action_description` (`description`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `action` */

/*Table structure for table `common_state` */

DROP TABLE IF EXISTS `common_state`;

CREATE TABLE `common_state` (
  `common_state_id` char(1) NOT NULL,
  `description` varchar(50) NOT NULL,
  `comments` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`common_state_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `common_state` */

/*Table structure for table `donated_object` */

DROP TABLE IF EXISTS `donated_object`;

CREATE TABLE `donated_object` (
  `donation_id` int(11) NOT NULL,
  `object_id` int(11) NOT NULL,
  `quantity` decimal(3,0) NOT NULL,
  PRIMARY KEY (`donation_id`,`object_id`),
  KEY `donation_id` (`donation_id`),
  KEY `object_id` (`object_id`),
  CONSTRAINT `FK_Donated_Object_Donation` FOREIGN KEY (`donation_id`) REFERENCES `donation` (`donation_id`),
  CONSTRAINT `FK_Donated_Object_Object` FOREIGN KEY (`object_id`) REFERENCES `object` (`object_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `donated_object` */

/*Table structure for table `donation` */

DROP TABLE IF EXISTS `donation`;

CREATE TABLE `donation` (
  `donation_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` mediumint(9) NOT NULL,
  `publication_id` int(11) NOT NULL,
  `donation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `process_state_id` char(1) NOT NULL DEFAULT 'V',
  PRIMARY KEY (`donation_id`),
  KEY `process_state_id` (`process_state_id`),
  KEY `publication_id` (`publication_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `FK_Donation_Process_state` FOREIGN KEY (`process_state_id`) REFERENCES `process_state` (`process_state_id`),
  CONSTRAINT `FK_Donation_Publication` FOREIGN KEY (`publication_id`) REFERENCES `publication` (`publication_id`),
  CONSTRAINT `FK_Donation_User` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `donation` */

/*Table structure for table `message` */

DROP TABLE IF EXISTS `message`;

CREATE TABLE `message` (
  `message_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id_from` mediumint(9) NOT NULL,
  `user_id_to` mediumint(9) NOT NULL,
  `publication_id` int(11) DEFAULT NULL,
  `conversation_id` int(11) DEFAULT NULL,
  `FAQ` tinyint(1) DEFAULT '0',
  `common_state_id` char(1) NOT NULL DEFAULT 'N',
  `subject` varchar(350) DEFAULT NULL,
  `text` text,
  `create_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` timestamp NULL DEFAULT NULL,
  `delete_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`message_id`),
  KEY `publication_id` (`publication_id`),
  KEY `common_state_id` (`common_state_id`),
  KEY `user_id_from` (`user_id_from`),
  KEY `user_id_to` (`user_id_to`),
  CONSTRAINT `FK_Message_User_To` FOREIGN KEY (`user_id_to`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FK_Message_Publication` FOREIGN KEY (`publication_id`) REFERENCES `publication` (`publication_id`),
  CONSTRAINT `FK_Message_State` FOREIGN KEY (`common_state_id`) REFERENCES `common_state` (`common_state_id`),
  CONSTRAINT `FK_Message_User_From` FOREIGN KEY (`user_id_from`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `message` */

/*Table structure for table `object` */

DROP TABLE IF EXISTS `object`;

CREATE TABLE `object` (
  `object_id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(200) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `subcategory_id` tinyint(4) NOT NULL,
  `category_id` tinyint(4) NOT NULL,
  PRIMARY KEY (`object_id`,`subcategory_id`,`category_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `FK_Publication_Subcategory_Category_Obj` FOREIGN KEY (`category_id`) REFERENCES `publication_category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Table structure for table `offer_type` */

DROP TABLE IF EXISTS `offer_type`;

CREATE TABLE `offer_type` (
  `offer_type_id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `description` varchar(50) DEFAULT NULL,
  `comments` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`offer_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `offer_type` */


/*Table structure for table `process_state` */

DROP TABLE IF EXISTS `process_state`;

CREATE TABLE `process_state` (
  `process_state_id` char(1) NOT NULL,
  `description` varchar(50) NOT NULL,
  PRIMARY KEY (`process_state_id`),
  UNIQUE KEY `UQ_Process_state_description` (`description`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `process_state` */

/*Table structure for table `publication` */

DROP TABLE IF EXISTS `publication`;

CREATE TABLE `publication` (
  `publication_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` mediumint(9) NOT NULL,
  `publication_type_id` tinyint(4) DEFAULT NULL,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `title` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `expiration_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `category_id` tinyint(4) DEFAULT NULL,
  `subcategory_id` tinyint(4) DEFAULT NULL,
  `views` int(11) DEFAULT NULL,
  `process_state_id` char(1) DEFAULT NULL,
  PRIMARY KEY (`publication_id`),
  KEY `category_id` (`category_id`),
  KEY `process_state_id` (`process_state_id`),
  KEY `category_id_2` (`category_id`,`subcategory_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `FK_Publication_Process_state` FOREIGN KEY (`process_state_id`) REFERENCES `process_state` (`process_state_id`),
  CONSTRAINT `FK_Publication_User` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `publication` */

/*Table structure for table `publication_category` */

DROP TABLE IF EXISTS `publication_category`;

CREATE TABLE `publication_category` (
  `category_id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `description` varchar(70) NOT NULL,
  `common_state_id` char(1) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category_id` (`category_id`),
  KEY `common_state_id` (`common_state_id`),
  CONSTRAINT `FK_Category_State` FOREIGN KEY (`common_state_id`) REFERENCES `common_state` (`common_state_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `publication_category` */

/*Table structure for table `publication_favorite` */

DROP TABLE IF EXISTS `publication_favorite`;

CREATE TABLE `publication_favorite` (
  `favorite_id` int(11) NOT NULL AUTO_INCREMENT,
  `publication_id` int(11) NOT NULL,
  `user_id` mediumint(9) NOT NULL,
  `start_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`favorite_id`,`publication_id`,`user_id`),
  KEY `publication_id` (`publication_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `FK_Publication_Favourite_Publication` FOREIGN KEY (`publication_id`) REFERENCES `publication` (`publication_id`),
  CONSTRAINT `FK_Publication_Favourite_User` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `publication_favorite` */

/*Table structure for table `publication_image` */

DROP TABLE IF EXISTS `publication_image`;

CREATE TABLE `publication_image` (
  `publication_id` int(11) NOT NULL,
  `image_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `path` varchar(500) NOT NULL,
  PRIMARY KEY (`publication_id`,`image_id`),
  KEY `publication_id` (`publication_id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `FK_Publication_Image_Publication` FOREIGN KEY (`publication_id`) REFERENCES `publication` (`publication_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `publication_image` */

/*Table structure for table `publication_object` */

DROP TABLE IF EXISTS `publication_object`;

CREATE TABLE `publication_object` (
  `publication_id` int(11) NOT NULL,
  `object_id` int(11) NOT NULL,
  `quantity` decimal(7,0) DEFAULT NULL,
  PRIMARY KEY (`publication_id`,`object_id`),
  KEY `object_id` (`object_id`),
  KEY `publication_id` (`publication_id`),
  CONSTRAINT `FK_Publication` FOREIGN KEY (`publication_id`) REFERENCES `publication` (`publication_id`),
  CONSTRAINT `FK_Publication_Object_Object` FOREIGN KEY (`object_id`) REFERENCES `object` (`object_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `publication_object` */

/*Table structure for table `publication_offer` */

DROP TABLE IF EXISTS `publication_offer`;

CREATE TABLE `publication_offer` (
  `publication_id` int(11) NOT NULL,
  `process_state_offer` char(1) DEFAULT NULL,
  `offer_type_id` tinyint(4) DEFAULT NULL,
  `quantity_users_to_paused` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`publication_id`),
  KEY `offer_type_id` (`offer_type_id`),
  KEY `process_state_offer` (`process_state_offer`),
  KEY `publication_id` (`publication_id`),
  CONSTRAINT `FK_Offer_Offer_Type` FOREIGN KEY (`offer_type_id`) REFERENCES `offer_type` (`offer_type_id`),
  CONSTRAINT `FK_Offer_Process_state` FOREIGN KEY (`process_state_offer`) REFERENCES `process_state` (`process_state_id`),
  CONSTRAINT `FK_Offer_Publication` FOREIGN KEY (`publication_id`) REFERENCES `publication` (`publication_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `publication_offer` */

/*Table structure for table `publication_socialnetwork_activity` */

DROP TABLE IF EXISTS `publication_socialnetwork_activity`;

CREATE TABLE `publication_socialnetwork_activity` (
  `activity_id` int(11) NOT NULL AUTO_INCREMENT,
  `publication_id` int(11) NOT NULL,
  `action_id` tinyint(4) DEFAULT NULL,
  `user_id` mediumint(9) DEFAULT NULL,
  PRIMARY KEY (`activity_id`),
  KEY `publication_id` (`publication_id`),
  KEY `action_id` (`action_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `FK_Publication_SocialNetwork_Activity_Publication` FOREIGN KEY (`publication_id`) REFERENCES `publication` (`publication_id`),
  CONSTRAINT `FK_Publication_SocialNetwork_Activity_SocialNetwork_Action` FOREIGN KEY (`action_id`) REFERENCES `action` (`action_id`),
  CONSTRAINT `FK_Publication_SocialNetwork_Activity_User` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `publication_socialnetwork_activity` */

/*Table structure for table `publication_sponsor` */

DROP TABLE IF EXISTS `publication_sponsor`;

CREATE TABLE `publication_sponsor` (
  `sponsor_id` int(11) NOT NULL AUTO_INCREMENT,
  `publication_id` int(11) NOT NULL,
  `user_tw` varchar(50) NOT NULL,
  PRIMARY KEY (`sponsor_id`,`publication_id`,`user_tw`),
  KEY `publication_id` (`publication_id`),
  CONSTRAINT `FK_Publication_sponsor_Publication` FOREIGN KEY (`publication_id`) REFERENCES `publication` (`publication_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `publication_sponsor` */

/*Table structure for table `publication_subcategory` */

DROP TABLE IF EXISTS `publication_subcategory`;

CREATE TABLE `publication_subcategory` (
  `category_id` tinyint(4) NOT NULL,
  `subcategory_id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `description` varchar(50) NOT NULL,
  `common_state_id` char(1) DEFAULT NULL,
  PRIMARY KEY (`subcategory_id`,`category_id`),
  KEY `category_id` (`category_id`),
  KEY `common_state_id` (`common_state_id`),
  CONSTRAINT `FK_Publication_Subcategory_Category` FOREIGN KEY (`category_id`) REFERENCES `publication_category` (`category_id`),
  CONSTRAINT `FK_Subcategory_State` FOREIGN KEY (`common_state_id`) REFERENCES `common_state` (`common_state_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*Table structure for table `publication_type` */

DROP TABLE IF EXISTS `publication_type`;

CREATE TABLE `publication_type` (
  `publication_type_id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `description` varchar(300) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`publication_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `publication_type` */

/*Table structure for table `sponsor` */

DROP TABLE IF EXISTS `sponsor`;

CREATE TABLE `sponsor` (
  `sponsor_id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `social_network_id` int(11) DEFAULT NULL,
  `common_state_id` char(1) DEFAULT NULL,
  PRIMARY KEY (`sponsor_id`),
  UNIQUE KEY `UQ_Sponsor_social_network_id` (`social_network_id`),
  KEY `common_state_id` (`common_state_id`),
  CONSTRAINT `FK_Sponsor_Common_State` FOREIGN KEY (`common_state_id`) REFERENCES `common_state` (`common_state_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `sponsor` */

/*Table structure for table `type_phone` */

DROP TABLE IF EXISTS `type_phone`;

CREATE TABLE `type_phone` (
  `type_phone_id` tinyint(4) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`type_phone_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `type_phone` */


/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `user_id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` char(40) NOT NULL,
  `last_login` date DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UQ_User_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

-- insert  into `user`(`user_id`,`email`,`password`,`last_login`,`enabled`,`deleted`) values (1,'admin','7110eda4d09e062aa5e4a390b0a572ac0d2c0220',NULL,1,0),(2,'sabriancasado@gmail.com','da39a3ee5e6b4b0d3255bfef95601890afd80709',NULL,1,0),(4,'sergio_areco@hotmail.com','7110eda4d09e062aa5e4a390b0a572ac0d2c0220',NULL,0,0),(5,'sergiovareco@gmail.com','6ed32edf4e92ab3c0a4dc6f90242953c344051ad',NULL,1,0);

/*Table structure for table `user_address` */

DROP TABLE IF EXISTS `user_address`;

CREATE TABLE `user_address` (
  `address_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` mediumint(9) NOT NULL,
  `street` varchar(100) DEFAULT NULL,
  `number` decimal(8,0) DEFAULT NULL,
  `postal_code` varchar(20) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `floor` varchar(4) DEFAULT NULL,
  `apartment` varchar(4) DEFAULT NULL,
  `principal` char(1) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL,
  `province_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`address_id`,`user_id`),
  KEY `city_id` (`city_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `user_address` */

/*Table structure for table `user_data` */

DROP TABLE IF EXISTS `user_data`;

CREATE TABLE `user_data` (
  `user_id` mediumint(9) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `birthday_date` date DEFAULT NULL,
  `description` text,
  `gravatar_email` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `FK_User_Data_User` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `user_data` */

/*Table structure for table `user_phone` */

DROP TABLE IF EXISTS `user_phone`;

CREATE TABLE `user_phone` (
  `user_id` mediumint(9) NOT NULL,
  `phone_id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `number` varchar(25) DEFAULT NULL,
  `type_phone_id` tinyint(4) DEFAULT NULL,
  `area_code` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`phone_id`),
  UNIQUE KEY `phone_id_2` (`phone_id`),
  KEY `type_phone_id` (`type_phone_id`),
  KEY `user_id` (`user_id`),
  KEY `phone_id` (`phone_id`),
  CONSTRAINT `FK_User_Phone_Type_Phone` FOREIGN KEY (`type_phone_id`) REFERENCES `type_phone` (`type_phone_id`),
  CONSTRAINT `FK_User_Phone_User` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `user_phone` */

/*Table structure for table `user_request` */

DROP TABLE IF EXISTS `user_request`;

CREATE TABLE `user_request` (
  `publication_id` int(11) NOT NULL,
  `user_id` mediumint(9) NOT NULL,
  `request_date` datetime DEFAULT NULL,
  `common_state_id` char(1) DEFAULT NULL,
  PRIMARY KEY (`publication_id`,`user_id`),
  KEY `common_state_id` (`common_state_id`),
  KEY `publication_id` (`publication_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `user_request` */

/*Table structure for table `user_score` */

DROP TABLE IF EXISTS `user_score`;

CREATE TABLE `user_score` (
  `user_id_from` mediumint(9) NOT NULL,
  `user_id_to` mediumint(9) NOT NULL,
  `publication_id` int(11) NOT NULL,
  `score` decimal(1,0) DEFAULT NULL,
  `scoring_date` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id_from`,`user_id_to`,`publication_id`),
  KEY `publication_id` (`publication_id`),
  KEY `user_id_from` (`user_id_from`),
  KEY `user_id_to` (`user_id_to`),
  CONSTRAINT `FK_User_Score_Publication` FOREIGN KEY (`publication_id`) REFERENCES `publication` (`publication_id`),
  CONSTRAINT `FK_User_Score_User_From` FOREIGN KEY (`user_id_from`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FK_User_Score_User_To` FOREIGN KEY (`user_id_to`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `user_score` */

/*Table structure for table `publication_vote` */

DROP TABLE IF EXISTS `publication_vote`;

CREATE TABLE `publication_vote` (
  `vote_id` int(11) NOT NULL AUTO_INCREMENT,
  `publication_id` int(11) NOT NULL,
  `user_id` mediumint(9) NOT NULL,
  PRIMARY KEY (`vote_id`,`publication_id`,`user_id`),
  KEY `publication_id` (`publication_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `FK_Publication_vote_Publication` FOREIGN KEY (`publication_id`) REFERENCES `publication` (`publication_id`),
  CONSTRAINT `FK_Publication_vote_User` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `publication_vote` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
