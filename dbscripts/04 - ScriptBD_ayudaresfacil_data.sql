
/*Data for the table `common_state` */

insert  into `common_state`(`common_state_id`,`description`,`comments`) values ('A','ACTIVO',NULL),('B','BAJA',NULL),('L','LEIDO',NULL),('N','NUEVO',NULL);

/*Data for the table `publication_category` */

insert  into `publication_category`(`category_id`,`description`,`common_state_id`) values (1,'Indumentaria','A'),(2,'Alimentos','A'),(3,'Rodados','A'),(4,'Servicios','A'),(5,'Salud','A'),(6,'Hogar','A'),(7,'Muebles','A'),(8,'Varios','A'),(9,'Dinero','A'),(10,'Juguetes','A');

/*Data for the table `publication_subcategory` */

insert  into `publication_subcategory`(`category_id`,`subcategory_id`,`description`,`common_state_id`) values (1,1,'Ropa','A'),(1,2,'Calzado','A'),(1,3,'Gorros','A'),(2,4,'Enlatados','A'),(2,5,'Agua','A'),(2,6,'Secos','A'),(2,7,'Varios','A'),(3,8,'Silla ruedas','A'),(3,9,'Bicicleta','A'),(4,10,'Plomeria','A'),(4,11,'Gasista','A'),(4,12,'Electricista','A'),(4,13,'Albañil','A'),(5,14,'Higiene','A'),(5,15,'Indumentaria','A'),(6,16,'Ropa de cama','A'),(6,17,'Utensillos de cocina','A'),(7,18,'Mesa','A'),(7,19,'Silla','A'),(7,20,'Cama','A'),(8,21,'Varios','A'),(9,22,'Dinero','A'),(10,23,'Juguetes nene','A'),(10,24,'Juguetes nena','A'),(10,25,'Varios','A');

/*Data for the table `object` */

insert  into `object`(`object_id`,`description`,`created_date`,`subcategory_id`,`category_id`) values (1,'Pantalon','2014-12-07 16:36:46',1,1),(2,'Remera','2014-12-07 16:36:52',1,1),(3,'Buzo','2014-12-07 16:37:01',1,1),(4,'Medias','2014-12-07 16:37:11',1,1),(5,'Botin','2014-12-07 16:37:19',2,1),(6,'Ojotas','2014-12-07 16:37:26',2,1),(7,'Zapato','2014-12-07 16:37:47',2,1),(8,'Sandalia','2014-12-07 16:38:04',2,1),(9,'Gorro','2014-12-07 16:38:13',3,1),(10,'Arvejas','2014-12-07 16:38:33',4,2),(11,'Choclo','2014-12-07 16:38:45',4,2),(12,'Tomate','2014-12-07 16:38:50',4,2),(13,'Botella','2014-12-07 16:44:37',5,2),(14,'Bidon','2014-12-07 16:44:44',5,2),(15,'Harina','2014-12-07 16:45:15',6,2),(16,'Pan Rallado','2014-12-07 16:45:24',6,2),(17,'Varios','2014-12-07 16:47:14',7,2),(18,'Silla de ruedas','2014-12-07 16:47:25',8,3),(19,'Silla de ruedas mecanica','2014-12-07 16:47:40',8,3),(20,'Bicicleta niños','2014-12-07 16:58:50',9,3),(21,'Bicicleta adultos','2014-12-07 16:59:06',9,3),(22,'Plomeria','2014-12-07 16:59:18',10,4),(23,'Gasista','2014-12-07 16:59:28',11,4),(24,'Electricista','2014-12-07 16:59:37',12,4),(25,'Albañileria','2014-12-07 17:00:01',13,4),(26,'Alcohol','2014-12-07 17:00:23',14,5),(27,'Alcohol en gel','2014-12-07 17:00:31',14,5),(28,'Jeringa','2014-12-07 17:00:47',14,5),(29,'Algodon','2014-12-07 17:00:57',14,5),(30,'Ambo','2014-12-07 17:01:07',15,5),(31,'Barbijo','2014-12-07 17:01:24',15,5),(32,'Sabana','2014-12-07 17:01:35',16,6),(33,'Almohada','2014-12-07 17:01:43',16,6),(34,'Colchon','2014-12-07 17:01:53',16,6),(35,'Frazada','2014-12-07 17:02:03',16,6),(36,'Cacerola','2014-12-07 17:02:16',17,6),(37,'Cubiertos','2014-12-07 17:02:28',17,6),(38,'Vasos','2014-12-07 17:02:38',17,6),(39,'Platos','2014-12-07 17:02:48',17,6),(40,'Mesa 4','2014-12-07 17:03:16',18,7),(41,'Mesa 6','2014-12-07 17:03:32',18,7),(42,'Mesa 8','2014-12-07 17:03:46',18,7),(43,'Banco','2014-12-07 17:03:55',19,7),(44,'Silla','2014-12-07 17:04:04',19,7),(45,'Banqueta','2014-12-07 17:04:11',19,7),(46,'Catre','2014-12-07 17:04:20',20,7),(47,'Varios','2014-12-07 17:04:28',21,8),(48,'Dinero','2014-12-07 17:35:46',22,9),(49,'Muñeca','2014-12-07 17:54:55',24,10),(50,'Camiones','2014-12-07 17:55:04',23,10),(51,'Varios','2014-12-07 17:55:12',23,10),(51,'Varios','2014-12-07 17:58:33',25,10);

/*Data for the table `offer_type` */

insert  into `offer_type`(`offer_type_id`,`description`,`comments`) values (1,'AL PRIMER POSTOR','EL PRIMERO QUE SOLICITE LA PUBLICACION, SE HACE PROPIETARIO DE LA MISMA.'),(2,'ELECCION ENTRE CANDIDATOS','SE ESTABLECE UN NUMERO DE POSIBLES PROPIETARIOS. UNA VEZ ALCANZADOS, SE PAUSA LA PUBLICACION Y SE EVALUA ALGUNA (O NINGUNA) DE LAS OPCIONES.'),(3,'EVALUACION UNO A UNO','CADA VEZ QUE ALGUIEN SOLICITA LO OFRECIDO, SE PAUSA LA PUBLICACION Y SE EVALUA SI ES (O NO) INDICADO PARA RECIBIR EL OFRECIMIENTO.');

/*Data for the table `process_state` */

insert  into `process_state`(`process_state_id`,`description`) values ('B','BORRADO'),('C','CERRADO'),('P','PAUSADO'),('V','VIGENTE'),('W','PENDIENTE'),('F','FINALIZADO');

/*Data for the table `type_phone` */

insert  into `type_phone`(`type_phone_id`,`description`) values (1,'PARTICULAR'),(2,'CELULAR'),(3,'LABORAL');

/*Data for the table `user` */

insert  into `user`(`user_id`,`email`,`password`,`last_login`,`enabled`,`deleted`) values (1,'sabrinamarielcasado@gmail.com','601f1889667efaebb33b8c12572835da3f027f78',NULL,1,0),(2,'shuet-@hotmail.com','601f1889667efaebb33b8c12572835da3f027f78',NULL,1,0),(3,'admin','7110eda4d09e062aa5e4a390b0a572ac0d2c0220',NULL,1,0),(4,'sergio_areco@hotmail.com','7110eda4d09e062aa5e4a390b0a572ac0d2c0220',NULL,0,0),(5,'sergiovareco@gmail.com','6ed32edf4e92ab3c0a4dc6f90242953c344051ad',NULL,1,0);

/*Data for the table `user_address` */

insert  into `user_address`(`address_id`,`user_id`,`street`,`number`,`postal_code`,`city_id`,`floor`,`apartment`,`principal`,`department_id`,`province_id`) values (8,1,'Callao','2094','1768',958,'2','D','',3,1);

/*Data for the table `user_data` */

insert  into `user_data`(`user_id`,`name`,`last_name`,`birthday_date`,`description`,`gravatar_email`) values (1,'Sabrina','Casado','2014-05-29','sasaa','sabrinamarielcasado@gmail.com'),(2,'Melina',NULL,NULL,NULL,'');

/*Data for the table `user_phone` */

insert  into `user_phone`(`user_id`,`phone_id`,`number`,`type_phone_id`,`area_code`) values (1,10,'1561181228',1,'011');

/*Data for the table `publication` */

insert  into `publication`(`publication_id`,`user_id`,`publication_type_id`,`creation_date`,`title`,`description`,`expiration_date`,`category_id`,`subcategory_id`,`views`,`process_state_id`) values (1,1,1,'2014-12-07 17:39:12','Donación de Indumentaria','Buenas a todos, \nLes comento que tengo una fabrica de indumentaria y hace ya 12 años dono ropa para los niños que más lo necesiten. La idea principal es abastecer escuelas e iglesias.','2015-01-01 03:00:00',1,1,13,'V'),(2,2,1,'2014-12-07 17:42:12','Ofrezco alimentos','Estoy ofreciendo 150kg de alimento no perecedero, entre ellos hay latas de choclo, tomate, arvejas, legumbres, fideos. Por favor contactarse conmigo para evaluar las posibilidades de la entrega.','2015-01-15 03:00:00',2,7,2,'V'),(3,3,1,'2014-12-07 17:44:10','Silla para mascota','Hace unos meses mi perro sufrió un accidente y tuvimos que comprarle esta silla para que pudiera seguir caminando. Hoy en día ya no se encuentra con nosotros y quiero donar la silla para alguien que este pasando por lo mismo que pase yo.','2015-01-14 03:00:00',3,8,55,'V'),(4,1,1,'2014-12-07 17:47:43','Fabrica de sommier','Tengo 50 colchones que se mojaron con el ultimo temporal y están en muy buen estado pero a mi no me sirven para venderlos así que decido donarlos. Entre ellos hay de 1 plaza o 1 1/2 plaza.','2015-01-15 03:00:00',6,16,16,'V'),(5,1,1,'2014-12-07 17:59:58','Juguetes para navidad','Se acerca la navidad y hay muchos niños que no van a tener la posibilidad de recibir los juguetes que se merecen.. Por eso en el barrio de San Justo, todos los años se hace una colecta dedicada a estos inocentes. Son 50 cajas de juguetes variados.','2015-01-01 03:00:00',10,25,17,'V'),(6,1,1,'2014-12-07 18:04:55','Abrigo','Quiero donar unas frazadas que tengo y ya no utilizo para que alguien le de mas uso que yo. Preferentemente para gente de la calle.','2015-01-08 03:00:00',6,16,1,'V'),(7,3,1,'2014-12-07 18:08:51','Utensillos','Tengo para donar jeringas, guantes y algunas cosas extra de enfermería. Tengo para donar jeringas, guantes y algunas cosas extra de enfermería.','2015-01-08 03:00:00',5,14,22,'V'),(8,2,1,'2014-12-07 18:13:02','Juego de mesa y sillas','Hola ! tengo un juego de mesa y sillas que ya no utilizo, es de cuando vivía en una casa más grande pero ahora me mudé a un departamento y ya no lo necesito. Me gustaría entregárselo a un comedor, o colegio que sepa que le van a dar el valor que yo le di.','2015-01-08 03:00:00',7,19,87,'V'),(9,4,1,'2014-12-07 18:16:09','Calzado','Regalo zapatillas talle 38/39 y 40 de hombre. Soy fabricante, los pares son nuevos pero de temporadas pasadas.','2015-01-08 03:00:00',1,2,3,'V'),(10,1,2,'2014-12-07 21:17:46','Salvemos a HELENITA una vez más!','Después de varias internaciones, una cirugía de hidrocefalia y colocación de válvula, los médicos le diagnosticaron Osteopetrosis, una rara enfermedad genética y degenerativa que si no es detenida de manera rápida le puede costar primera la visión, la audición y por último su vida. Es que sus huesos crecen compactos y se ensanchan, lo que le genera una compresión en todos los nervios de su cuerpo.','2015-01-15 03:00:00',9,22,3,'V'),(11,1,2,'2014-12-07 21:23:35','Pablito necesita ayuda','Pablito es un niño de 8 meses y necesita de todos nosotros para combatir su problema de obesidad. Los padres no tienen los recursos para darle los alimentos que necesita ingerir ni para realizarle los tratamientos que les indican los médicos.','2015-02-18 03:00:00',9,22,2,'V'),(24,1,2,'2014-12-08 23:57:30','Una silla para rosa','En la ciudad de Chaco un alto porcentaje de la población necesita de instrumentos como bastones y sillas de ruedas. Una pareja cristiana entrega literalmente su vida para llenar la necesidad de muchas personas necesitadas de estas ayudas técnicas. \nRosita necesita una silla de ruedas ya que esta siendo movilizada en una silla de plástico y esto esta afectando su cervical.','2015-02-19 03:00:00',3,8,1,'V'),(25,1,2,'2014-12-09 00:04:33','La escuelita Nº21 te necesita','Por favor necesitamos de la solidaridad de mucha gente para que estos niños de la escuela Nº21 de la ciudad de Mendoza dejen de pasar hambre.','2015-01-21 03:00:00',2,7,98,'V'),(26,1,1,'2014-12-08 21:41:23','as','as','2015-01-13 03:00:00',9,22,0,'B');

/*Data for the table `publication_favorite` */

insert  into `publication_favorite`(`favorite_id`,`publication_id`,`user_id`,`start_date`) values (2,3,1,'2014-12-07 17:44:47'),(32,9,2,'2014-12-07 20:37:24'),(34,11,2,'2014-12-07 21:16:13'),(45,2,1,'2014-12-08 16:54:07'),(47,9,1,'2014-12-08 16:54:10'),(50,11,1,'2014-12-08 19:10:38');

/*Data for the table `publication_image` */

insert  into `publication_image`(`publication_id`,`image_id`,`path`) values (1,1,'\\ayudaresfacil\\client\\src\\upload\\ropa (1).jpg'),(2,2,'\\ayudaresfacil\\client\\src\\upload\\alimento (1).jpg'),(3,3,'\\ayudaresfacil\\client\\src\\upload\\silla (4).jpg'),(4,4,'\\ayudaresfacil\\client\\src\\upload\\colchon (2).jpg'),(5,5,'\\ayudaresfacil\\client\\src\\upload\\jueguete (1).jpg'),(6,6,'\\ayudaresfacil\\client\\src\\upload\\frazada (1).jpg'),(7,7,'\\ayudaresfacil\\client\\src\\upload\\jeringa (1).jpg'),(8,8,'\\ayudaresfacil\\client\\src\\upload\\mesa (1).jpg'),(9,9,'\\ayudaresfacil\\client\\src\\upload\\calzado (1).jpg'),(10,10,'\\ayudaresfacil\\client\\src\\upload\\dinero (1).jpg'),(11,11,'\\ayudaresfacil\\client\\src\\upload\\dinero (2).jpg'),(24,24,'\\ayudaresfacil\\client\\src\\upload\\silla (6).jpg'),(25,25,'\\ayudaresfacil\\client\\src\\upload\\comida (2).jpg'),(26,26,'\\ayudaresfacil\\client\\src\\upload\\silla (4).jpg');

/*Data for the table `publication_object` */

insert  into `publication_object`(`publication_id`,`object_id`,`quantity`) values (1,1,'1'),(2,17,'1'),(3,18,'1'),(4,34,'1'),(5,51,'1'),(6,35,'1'),(7,27,'1'),(8,44,'1'),(9,7,'1'),(10,48,'10900'),(11,48,'1500000'),(24,19,'1'),(25,17,'1'),(26,48,NULL);

/*Data for the table `publication_offer` */

insert  into `publication_offer`(`publication_id`,`process_state_offer`,`offer_type_id`,`quantity_users_to_paused`) values (1,'V',3,1),(2,'V',3,1),(3,'V',3,1),(4,'V',3,1),(5,'V',3,1),(6,'V',3,1),(7,'V',3,1),(8,'V',3,1),(9,'V',3,1),(26,'V',3,1);

/*Data for the table `publication_socialnetwork_activity` */

/*Data for the table `publication_sponsor` */

insert  into `publication_sponsor`(`sponsor_id`,`publication_id`,`user_tw`) values (1,10,'@araceli_g'),(2,10,'@marcosrojo5'),(3,10,'@mariacelestecid'),(4,10,'@G_Higuain'),(5,11,'@perroscalle'),(11,11,'@florbertottiok'),(12,11,'@DiMariaFideo7'),(13,24,'@MauroIcardi'),(14,24,'@wandaicardi'),(15,25,'@ntvgoficial');


/*Data for the table `publication_type` */

/*Data for the table `publication_vote` */

insert  into `publication_vote`(`vote_id`,`publication_id`,`user_id`) values (1,10,2);

/*Data for the table `sponsor` */


/*Data for the table `user_request` */

/*Data for the table `user_score` */

