-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 15, 2014 at 05:45 PM
-- Server version: 5.6.21
-- PHP Version: 5.5.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `ayudaresfacil`
--

-- --------------------------------------------------------

--
-- Table structure for table `action`
--

CREATE TABLE IF NOT EXISTS `action` (
`action_id` tinyint(4) NOT NULL,
  `description` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `common_state`
--

CREATE TABLE IF NOT EXISTS `common_state` (
  `common_state_id` char(1) NOT NULL,
  `description` varchar(50) NOT NULL,
  `comments` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `common_state`
--

INSERT INTO `common_state` (`common_state_id`, `description`, `comments`) VALUES
('A', 'ACTIVO', NULL),
('B', 'BAJA', NULL),
('L', 'LEIDO', NULL),
('N', 'NUEVO', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `donated_object`
--

CREATE TABLE IF NOT EXISTS `donated_object` (
  `donation_id` int(11) NOT NULL,
  `object_id` int(11) NOT NULL,
  `quantity` decimal(3,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `donation`
--

CREATE TABLE IF NOT EXISTS `donation` (
`donation_id` int(11) NOT NULL,
  `user_id` mediumint(9) NOT NULL,
  `publication_id` int(11) NOT NULL,
  `donation_date` datetime NOT NULL,
  `process_state_id` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE IF NOT EXISTS `message` (
`message_id` int(11) NOT NULL,
  `user_id_from` mediumint(9) NOT NULL,
  `user_id_to` mediumint(9) NOT NULL,
  `publication_id` int(11) DEFAULT NULL,
  `first_message_id` int(11) DEFAULT NULL,
  `FAQ` tinyint(1) DEFAULT '0',
  `common_state_id` char(1) NOT NULL,
  `subject` varchar(50) DEFAULT NULL,
  `text` varchar(500) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `delete_date` datetime DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`message_id`, `user_id_from`, `user_id_to`, `publication_id`, `first_message_id`, `FAQ`, `common_state_id`, `subject`, `text`, `create_date`, `update_date`, `delete_date`) VALUES
(1, 4, 4, 0, 0, 0, 'N', 'testing', 'Nuevo mensaje', '2014-05-04 03:52:11', '2014-05-04 04:05:49', '2014-05-04 04:08:01'),
(2, 4, 4, 0, 0, 0, 'N', NULL, 'Nuevo mensaje', '2014-05-04 03:52:34', NULL, NULL),
(3, 4, 4, 0, 0, 0, 'N', 'asunto prueba', 'Nuevo mensaje', '2014-05-04 03:55:29', '2014-05-04 04:01:59', NULL),
(4, 4, 4, 0, 0, 0, 'N', 'asunto prueba', 'Nuevo mensaje', '2014-05-04 03:58:54', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `object`
--

CREATE TABLE IF NOT EXISTS `object` (
`object_id` int(11) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `object`
--

INSERT INTO `object` (`object_id`, `description`, `created_date`) VALUES
(1, 'DINERO', '2014-06-09 00:00:00'),
(2, 'MESA', '2014-06-09 00:00:00'),
(3, 'LIBROS', '2014-06-09 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `offer_type`
--

CREATE TABLE IF NOT EXISTS `offer_type` (
`offer_type_id` tinyint(4) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  `comments` varchar(200) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `offer_type`
--

INSERT INTO `offer_type` (`offer_type_id`, `description`, `comments`) VALUES
(1, 'AL PRIMER POSTOR', 'EL PRIMERO QUE SOLICITE LA PUBLICACION, SE HACE PROPIETARIO DE LA MISMA.'),
(2, 'ELECCION ENTRE CANDIDATOS', 'SE ESTABLECE UN NUMERO DE POSIBLES PROPIETARIOS. UNA VEZ ALCANZADOS, SE PAUSA LA PUBLICACION Y SE EVALUA ALGUNA (O NINGUNA) DE LAS OPCIONES.'),
(3, 'EVALUACION UNO A UNO', 'CADA VEZ QUE ALGUIEN SOLICITA LO OFRECIDO, SE PAUSA LA PUBLICACION Y SE EVALUA SI ES (O NO) INDICADO PARA RECIBIR EL OFRECIMIENTO.');

-- --------------------------------------------------------

--
-- Table structure for table `process_state`
--

CREATE TABLE IF NOT EXISTS `process_state` (
  `process_state_id` char(1) NOT NULL,
  `description` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `process_state`
--

INSERT INTO `process_state` (`process_state_id`, `description`) VALUES
('B', 'BORRADO'),
('C', 'CERRADO'),
('P', 'PAUSADO'),
('V', 'VIGENTE');

-- --------------------------------------------------------

--
-- Table structure for table `publication`
--

CREATE TABLE IF NOT EXISTS `publication` (
`publication_id` int(11) NOT NULL,
  `user_id` mediumint(9) NOT NULL,
  `publication_type_id` tinyint(4) DEFAULT NULL,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `title` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `expiration_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `category_id` tinyint(4) DEFAULT NULL,
  `subcategory_id` tinyint(4) DEFAULT NULL,
  `views` int(11) DEFAULT NULL,
  `process_state_id` char(1) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `publication`
--

INSERT INTO `publication` (`publication_id`, `user_id`, `publication_type_id`, `creation_date`, `title`, `description`, `expiration_date`, `category_id`, `subcategory_id`, `views`, `process_state_id`) VALUES
(0, 4, NULL, '0000-00-00 00:00:00', '', '', NULL, NULL, NULL, NULL, NULL),
(1, 1, 1, '2014-06-09 00:00:00', 'Prueba de Ofrecimiento', 'Este es un registro de prueba para ver si se puede obtener un ofrecimiento', '2014-12-30 00:00:00', 1, 1, 100, 'V');

-- --------------------------------------------------------

--
-- Table structure for table `publication_category`
--

CREATE TABLE IF NOT EXISTS `publication_category` (
`category_id` tinyint(4) NOT NULL,
  `description` varchar(70) NOT NULL,
  `common_state_id` char(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `publication_category`
--

INSERT INTO `publication_category` (`category_id`, `description`, `common_state_id`) VALUES
(1, 'Muebles', 'A'),
(2, 'Salud', 'A');

-- --------------------------------------------------------

--
-- Table structure for table `publication_favorite`
--

CREATE TABLE IF NOT EXISTS `publication_favorite` (
`favorite_id` int(11) NOT NULL,
  `publication_id` int(11) NOT NULL,
  `user_id` mediumint(9) NOT NULL,
  `start_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `publication_favorite`
--

INSERT INTO `publication_favorite` (`favorite_id`, `publication_id`, `user_id`, `start_date`) VALUES
(2, 1, 1, '2014-06-09 18:03:30');

-- --------------------------------------------------------

--
-- Table structure for table `publication_image`
--

CREATE TABLE IF NOT EXISTS `publication_image` (
  `publication_id` int(11) NOT NULL,
  `image_id` bigint(20) NOT NULL,
  `path` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `publication_object`
--

CREATE TABLE IF NOT EXISTS `publication_object` (
  `publication_id` int(11) NOT NULL,
  `object_id` int(11) NOT NULL,
  `quantity` decimal(4,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `publication_offer`
--

CREATE TABLE IF NOT EXISTS `publication_offer` (
  `publication_id` int(11) NOT NULL,
  `process_state_offer` char(1) DEFAULT NULL,
  `offer_type_id` tinyint(4) DEFAULT NULL,
  `quantity_users_to_paused` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `publication_offer`
--

INSERT INTO `publication_offer` (`publication_id`, `process_state_offer`, `offer_type_id`, `quantity_users_to_paused`) VALUES
(1, 'V', 1, 20);

-- --------------------------------------------------------

--
-- Table structure for table `publication_socialnetwork_activity`
--

CREATE TABLE IF NOT EXISTS `publication_socialnetwork_activity` (
`activity_id` int(11) NOT NULL,
  `publication_id` int(11) NOT NULL,
  `action_id` tinyint(4) DEFAULT NULL,
  `user_id` mediumint(9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `publication_sponsor`
--

CREATE TABLE IF NOT EXISTS `publication_sponsor` (
`sponsor_id` int(11) NOT NULL,
  `publication_id` int(11) NOT NULL,
  `user_tw` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `publication_subcategory`
--

CREATE TABLE IF NOT EXISTS `publication_subcategory` (
  `category_id` tinyint(4) NOT NULL,
`subcategory_id` tinyint(4) NOT NULL,
  `description` varchar(50) NOT NULL,
  `common_state_id` char(1) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `publication_subcategory`
--

INSERT INTO `publication_subcategory` (`category_id`, `subcategory_id`, `description`, `common_state_id`) VALUES
(1, 1, 'Habitacion', 'A'),
(2, 2, 'Utilitarios', 'A');

-- --------------------------------------------------------

--
-- Table structure for table `publication_type`
--

CREATE TABLE IF NOT EXISTS `publication_type` (
`publication_type_id` tinyint(4) NOT NULL,
  `name` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `description` varchar(300) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `publication_type`
--

INSERT INTO `publication_type` (`publication_type_id`, `name`, `description`) VALUES
(1, 'Ofrecimiento', NULL),
(2, 'Pedido Monetario', NULL),
(3, 'Pedido de Objetos', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `publication_vote`
--

CREATE TABLE IF NOT EXISTS `publication_vote` (
`vote_id` int(11) NOT NULL,
  `publication_id` int(11) NOT NULL,
  `user_id` mediumint(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `sponsor`
--

CREATE TABLE IF NOT EXISTS `sponsor` (
`sponsor_id` mediumint(9) NOT NULL,
  `name` varchar(50) NOT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `social_network_id` int(11) DEFAULT NULL,
  `common_state_id` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `type_phone`
--

CREATE TABLE IF NOT EXISTS `type_phone` (
  `type_phone_id` tinyint(4) NOT NULL,
  `description` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `type_phone`
--

INSERT INTO `type_phone` (`type_phone_id`, `description`) VALUES
(1, 'PARTICULAR'),
(2, 'CELULAR'),
(3, 'LABORAL');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
`user_id` mediumint(9) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` char(40) NOT NULL,
  `last_login` date DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `email`, `password`, `last_login`, `enabled`, `deleted`) VALUES
(1, 'admin', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', NULL, 1, 0),
(2, 'sabriancasado@gmail.com', 'da39a3ee5e6b4b0d3255bfef95601890afd80709', NULL, 1, 0),
(4, 'sergio_areco@hotmail.com', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', NULL, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_address`
--

CREATE TABLE IF NOT EXISTS `user_address` (
  `address_id` int(11) NOT NULL,
  `user_id` mediumint(9) NOT NULL,
  `street` varchar(100) DEFAULT NULL,
  `number` decimal(8,0) DEFAULT NULL,
  `postal_code` varchar(20) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `floor` varchar(4) DEFAULT NULL,
  `apartment` varchar(4) DEFAULT NULL,
  `principal` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_address`
--

INSERT INTO `user_address` (`address_id`, `user_id`, `street`, `number`, `postal_code`, `city_id`, `floor`, `apartment`, `principal`) VALUES
(1, 1, 'Santa Juana de Arco', '3767', '1702', 207, '0', '1', '1');

-- --------------------------------------------------------

--
-- Table structure for table `user_data`
--

CREATE TABLE IF NOT EXISTS `user_data` (
  `user_id` mediumint(9) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `birthday_date` datetime DEFAULT NULL,
  `description` text,
  `gravatar_email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_data`
--

INSERT INTO `user_data` (`user_id`, `name`, `last_name`, `birthday_date`, `description`, `gravatar_email`) VALUES
(1, 'Sebastian', 'Perez', '1989-05-17 00:00:00', 'Soy el mejor!', 'perezsebastianm@gmail.com'),
(2, NULL, NULL, NULL, NULL, ''),
(4, 'Sergio', NULL, NULL, NULL, '');

-- --------------------------------------------------------

--
-- Table structure for table `user_phone`
--

CREATE TABLE IF NOT EXISTS `user_phone` (
  `user_id` mediumint(9) NOT NULL,
`phone_id` mediumint(9) NOT NULL,
  `number` varchar(25) DEFAULT NULL,
  `type_phone_id` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_phone`
--

INSERT INTO `user_phone` (`user_id`, `phone_id`, `number`, `type_phone_id`) VALUES
(1, 1, '4455556666', 3),
(1, 2, '0000000000', 3);

-- --------------------------------------------------------

--
-- Table structure for table `user_request`
--

CREATE TABLE IF NOT EXISTS `user_request` (
  `publication_id` int(11) NOT NULL,
  `user_id` mediumint(9) NOT NULL,
  `request_date` datetime DEFAULT NULL,
  `common_state_id` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_score`
--

CREATE TABLE IF NOT EXISTS `user_score` (
  `user_id_from` mediumint(9) NOT NULL,
  `user_id_to` mediumint(9) NOT NULL,
  `publication_id` int(11) NOT NULL,
  `score` decimal(1,0) DEFAULT NULL,
  `scoring_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `action`
--
ALTER TABLE `action`
 ADD PRIMARY KEY (`action_id`), ADD UNIQUE KEY `UQ_SocialNetwork_Action_description` (`description`);

--
-- Indexes for table `common_state`
--
ALTER TABLE `common_state`
 ADD PRIMARY KEY (`common_state_id`);

--
-- Indexes for table `donated_object`
--
ALTER TABLE `donated_object`
 ADD PRIMARY KEY (`donation_id`,`object_id`), ADD KEY `donation_id` (`donation_id`), ADD KEY `object_id` (`object_id`);

--
-- Indexes for table `donation`
--
ALTER TABLE `donation`
 ADD PRIMARY KEY (`donation_id`), ADD KEY `process_state_id` (`process_state_id`), ADD KEY `publication_id` (`publication_id`), ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
 ADD PRIMARY KEY (`message_id`), ADD KEY `publication_id` (`publication_id`), ADD KEY `common_state_id` (`common_state_id`), ADD KEY `user_id_from` (`user_id_from`), ADD KEY `user_id_to` (`user_id_to`);

--
-- Indexes for table `object`
--
ALTER TABLE `object`
 ADD PRIMARY KEY (`object_id`);

--
-- Indexes for table `offer_type`
--
ALTER TABLE `offer_type`
 ADD PRIMARY KEY (`offer_type_id`);

--
-- Indexes for table `process_state`
--
ALTER TABLE `process_state`
 ADD PRIMARY KEY (`process_state_id`), ADD UNIQUE KEY `UQ_Process_state_description` (`description`);

--
-- Indexes for table `publication`
--
ALTER TABLE `publication`
 ADD PRIMARY KEY (`publication_id`), ADD KEY `category_id` (`category_id`), ADD KEY `process_state_id` (`process_state_id`), ADD KEY `category_id_2` (`category_id`,`subcategory_id`), ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `publication_category`
--
ALTER TABLE `publication_category`
 ADD PRIMARY KEY (`category_id`), ADD UNIQUE KEY `category_id` (`category_id`), ADD KEY `common_state_id` (`common_state_id`);

--
-- Indexes for table `publication_favorite`
--
ALTER TABLE `publication_favorite`
 ADD PRIMARY KEY (`favorite_id`,`publication_id`,`user_id`), ADD KEY `publication_id` (`publication_id`), ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `publication_image`
--
ALTER TABLE `publication_image`
 ADD PRIMARY KEY (`publication_id`,`image_id`), ADD KEY `publication_id` (`publication_id`), ADD KEY `image_id` (`image_id`);

--
-- Indexes for table `publication_object`
--
ALTER TABLE `publication_object`
 ADD PRIMARY KEY (`publication_id`,`object_id`), ADD KEY `object_id` (`object_id`), ADD KEY `publication_id` (`publication_id`);

--
-- Indexes for table `publication_offer`
--
ALTER TABLE `publication_offer`
 ADD PRIMARY KEY (`publication_id`), ADD KEY `offer_type_id` (`offer_type_id`), ADD KEY `process_state_offer` (`process_state_offer`), ADD KEY `publication_id` (`publication_id`);

--
-- Indexes for table `publication_socialnetwork_activity`
--
ALTER TABLE `publication_socialnetwork_activity`
 ADD PRIMARY KEY (`activity_id`), ADD KEY `publication_id` (`publication_id`), ADD KEY `action_id` (`action_id`), ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `publication_sponsor`
--
ALTER TABLE `publication_sponsor`
 ADD PRIMARY KEY (`sponsor_id`,`publication_id`,`user_tw`), ADD KEY `publication_id` (`publication_id`);

--
-- Indexes for table `publication_subcategory`
--
ALTER TABLE `publication_subcategory`
 ADD PRIMARY KEY (`subcategory_id`), ADD KEY `category_id` (`category_id`), ADD KEY `common_state_id` (`common_state_id`);

--
-- Indexes for table `publication_type`
--
ALTER TABLE `publication_type`
 ADD PRIMARY KEY (`publication_type_id`);

--
-- Indexes for table `publication_vote`
--
ALTER TABLE `publication_vote`
 ADD PRIMARY KEY (`vote_id`,`publication_id`,`user_id`), ADD KEY `publication_id` (`publication_id`), ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `sponsor`
--
ALTER TABLE `sponsor`
 ADD PRIMARY KEY (`sponsor_id`), ADD UNIQUE KEY `UQ_Sponsor_social_network_id` (`social_network_id`), ADD KEY `common_state_id` (`common_state_id`);

--
-- Indexes for table `type_phone`
--
ALTER TABLE `type_phone`
 ADD PRIMARY KEY (`type_phone_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
 ADD PRIMARY KEY (`user_id`), ADD UNIQUE KEY `UQ_User_email` (`email`);

--
-- Indexes for table `user_address`
--
ALTER TABLE `user_address`
 ADD PRIMARY KEY (`address_id`,`user_id`), ADD KEY `city_id` (`city_id`), ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_data`
--
ALTER TABLE `user_data`
 ADD PRIMARY KEY (`user_id`), ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_phone`
--
ALTER TABLE `user_phone`
 ADD PRIMARY KEY (`user_id`,`phone_id`), ADD UNIQUE KEY `phone_id_2` (`phone_id`), ADD KEY `type_phone_id` (`type_phone_id`), ADD KEY `user_id` (`user_id`), ADD KEY `phone_id` (`phone_id`);

--
-- Indexes for table `user_request`
--
ALTER TABLE `user_request`
 ADD PRIMARY KEY (`publication_id`,`user_id`), ADD KEY `common_state_id` (`common_state_id`), ADD KEY `publication_id` (`publication_id`), ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_score`
--
ALTER TABLE `user_score`
 ADD PRIMARY KEY (`user_id_from`,`user_id_to`,`publication_id`), ADD KEY `publication_id` (`publication_id`), ADD KEY `user_id_from` (`user_id_from`), ADD KEY `user_id_to` (`user_id_to`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `action`
--
ALTER TABLE `action`
MODIFY `action_id` tinyint(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `donation`
--
ALTER TABLE `donation`
MODIFY `donation_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `object`
--
ALTER TABLE `object`
MODIFY `object_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `offer_type`
--
ALTER TABLE `offer_type`
MODIFY `offer_type_id` tinyint(4) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `publication`
--
ALTER TABLE `publication`
MODIFY `publication_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `publication_category`
--
ALTER TABLE `publication_category`
MODIFY `category_id` tinyint(4) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `publication_favorite`
--
ALTER TABLE `publication_favorite`
MODIFY `favorite_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `publication_socialnetwork_activity`
--
ALTER TABLE `publication_socialnetwork_activity`
MODIFY `activity_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `publication_sponsor`
--
ALTER TABLE `publication_sponsor`
MODIFY `sponsor_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `publication_subcategory`
--
ALTER TABLE `publication_subcategory`
MODIFY `subcategory_id` tinyint(4) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `publication_type`
--
ALTER TABLE `publication_type`
MODIFY `publication_type_id` tinyint(4) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `publication_vote`
--
ALTER TABLE `publication_vote`
MODIFY `vote_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `sponsor`
--
ALTER TABLE `sponsor`
MODIFY `sponsor_id` mediumint(9) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
MODIFY `user_id` mediumint(9) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `user_phone`
--
ALTER TABLE `user_phone`
MODIFY `phone_id` mediumint(9) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `donated_object`
--
ALTER TABLE `donated_object`
ADD CONSTRAINT `FK_Donated_Object_Donation` FOREIGN KEY (`donation_id`) REFERENCES `donation` (`donation_id`),
ADD CONSTRAINT `FK_Donated_Object_Object` FOREIGN KEY (`object_id`) REFERENCES `object` (`object_id`);

--
-- Constraints for table `donation`
--
ALTER TABLE `donation`
ADD CONSTRAINT `FK_Donation_Process_state` FOREIGN KEY (`process_state_id`) REFERENCES `process_state` (`process_state_id`),
ADD CONSTRAINT `FK_Donation_Publication` FOREIGN KEY (`publication_id`) REFERENCES `publication` (`publication_id`),
ADD CONSTRAINT `FK_Donation_User` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `message`
--
ALTER TABLE `message`
ADD CONSTRAINT `FK_Message_Publication` FOREIGN KEY (`publication_id`) REFERENCES `publication` (`publication_id`),
ADD CONSTRAINT `FK_Message_State` FOREIGN KEY (`common_state_id`) REFERENCES `common_state` (`common_state_id`),
ADD CONSTRAINT `FK_Message_User_From` FOREIGN KEY (`user_id_from`) REFERENCES `user` (`user_id`),
ADD CONSTRAINT `FK_Message_User_To` FOREIGN KEY (`user_id_to`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `publication`
--
ALTER TABLE `publication`
ADD CONSTRAINT `FK_Publication_Process_state` FOREIGN KEY (`process_state_id`) REFERENCES `process_state` (`process_state_id`),
ADD CONSTRAINT `FK_Publication_Publication_Category` FOREIGN KEY (`category_id`) REFERENCES `publication_category` (`category_id`),
ADD CONSTRAINT `FK_Publication_User` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `publication_category`
--
ALTER TABLE `publication_category`
ADD CONSTRAINT `FK_Category_State` FOREIGN KEY (`common_state_id`) REFERENCES `common_state` (`common_state_id`);

--
-- Constraints for table `publication_favorite`
--
ALTER TABLE `publication_favorite`
ADD CONSTRAINT `FK_Publication_Favourite_Publication` FOREIGN KEY (`publication_id`) REFERENCES `publication` (`publication_id`),
ADD CONSTRAINT `FK_Publication_Favourite_User` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `publication_image`
--
ALTER TABLE `publication_image`
ADD CONSTRAINT `FK_Publication_Image_Publication` FOREIGN KEY (`publication_id`) REFERENCES `publication` (`publication_id`);

--
-- Constraints for table `publication_object`
--
ALTER TABLE `publication_object`
ADD CONSTRAINT `FK_Publication` FOREIGN KEY (`publication_id`) REFERENCES `publication` (`publication_id`),
ADD CONSTRAINT `FK_Publication_Object_Object` FOREIGN KEY (`object_id`) REFERENCES `object` (`object_id`);

--
-- Constraints for table `publication_offer`
--
ALTER TABLE `publication_offer`
ADD CONSTRAINT `FK_Offer_Offer_Type` FOREIGN KEY (`offer_type_id`) REFERENCES `offer_type` (`offer_type_id`),
ADD CONSTRAINT `FK_Offer_Process_state` FOREIGN KEY (`process_state_offer`) REFERENCES `process_state` (`process_state_id`),
ADD CONSTRAINT `FK_Offer_Publication` FOREIGN KEY (`publication_id`) REFERENCES `publication` (`publication_id`);

--
-- Constraints for table `publication_socialnetwork_activity`
--
ALTER TABLE `publication_socialnetwork_activity`
ADD CONSTRAINT `FK_Publication_SocialNetwork_Activity_Publication` FOREIGN KEY (`publication_id`) REFERENCES `publication` (`publication_id`),
ADD CONSTRAINT `FK_Publication_SocialNetwork_Activity_SocialNetwork_Action` FOREIGN KEY (`action_id`) REFERENCES `action` (`action_id`),
ADD CONSTRAINT `FK_Publication_SocialNetwork_Activity_User` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `publication_sponsor`
--
ALTER TABLE `publication_sponsor`
ADD CONSTRAINT `FK_Publication_sponsor_Publication` FOREIGN KEY (`publication_id`) REFERENCES `publication` (`publication_id`);

--
-- Constraints for table `publication_subcategory`
--
ALTER TABLE `publication_subcategory`
ADD CONSTRAINT `FK_Publication_Subcategory_Category` FOREIGN KEY (`category_id`) REFERENCES `publication_category` (`category_id`),
ADD CONSTRAINT `FK_Subcategory_State` FOREIGN KEY (`common_state_id`) REFERENCES `common_state` (`common_state_id`);

--
-- Constraints for table `publication_vote`
--
ALTER TABLE `publication_vote`
ADD CONSTRAINT `FK_Publication_vote_Publication` FOREIGN KEY (`publication_id`) REFERENCES `publication` (`publication_id`),
ADD CONSTRAINT `FK_Publication_vote_User` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `sponsor`
--
ALTER TABLE `sponsor`
ADD CONSTRAINT `FK_Sponsor_Common_State` FOREIGN KEY (`common_state_id`) REFERENCES `common_state` (`common_state_id`);

--
-- Constraints for table `user_address`
--
ALTER TABLE `user_address`
ADD CONSTRAINT `FK_User_Address_City` FOREIGN KEY (`city_id`) REFERENCES `city` (`city_id`),
ADD CONSTRAINT `FK_User_Address_User` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `user_data`
--
ALTER TABLE `user_data`
ADD CONSTRAINT `FK_User_Data_User` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `user_phone`
--
ALTER TABLE `user_phone`
ADD CONSTRAINT `FK_User_Phone_Type_Phone` FOREIGN KEY (`type_phone_id`) REFERENCES `type_phone` (`type_phone_id`),
ADD CONSTRAINT `FK_User_Phone_User` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `user_score`
--
ALTER TABLE `user_score`
ADD CONSTRAINT `FK_User_Score_Publication` FOREIGN KEY (`publication_id`) REFERENCES `publication` (`publication_id`),
ADD CONSTRAINT `FK_User_Score_User_From` FOREIGN KEY (`user_id_from`) REFERENCES `user` (`user_id`),
ADD CONSTRAINT `FK_User_Score_User_To` FOREIGN KEY (`user_id_to`) REFERENCES `user` (`user_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
