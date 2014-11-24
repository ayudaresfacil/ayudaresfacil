insert into `publication_category` (`category_id`, `description`, `common_state_id`) values('1','Muebles','A');
insert into `publication_category` (`category_id`, `description`, `common_state_id`) values('2','Salud','A');

insert into `publication_subcategory` (`category_id`, `subcategory_id`, `description`, `common_state_id`) values('1','1','Mesas','A');
insert into `publication_subcategory` (`category_id`, `subcategory_id`, `description`, `common_state_id`) values('1','2','Sillas','A');
insert into `publication_subcategory` (`category_id`, `subcategory_id`, `description`, `common_state_id`) values('2','3','Cuadernos','A');
insert into `publication_subcategory` (`category_id`, `subcategory_id`, `description`, `common_state_id`) values('2','4','Lapiceras','A');

insert into `publication_type` (`publication_type_id`, `name`, `description`) values('1','Ofrecimiento','Offer');
insert into `publication_type` (`publication_type_id`, `name`, `description`) values('2','Pedido','Request');

insert into `process_state` (`process_state_id`, `description`) values('B','Borrado');
insert into `process_state` (`process_state_id`, `description`) values('C','Cerrado');
insert into `process_state` (`process_state_id`, `description`) values('P','Pausado');
insert into `process_state` (`process_state_id`, `description`) values('V','Vigente');

insert into `publication` (`publication_id`, `user_id`, `publication_type_id`, `creation_date`, `title`, `description`, `expiration_date`, `category_id`, `subcategory_id`, `views`, `process_state_id`) values('1','1','1','2014-05-28 00:00:00','ayuda','alalallala\r\n','2015-12-01 00:00:00','1','1','11','V');
insert into `publication` (`publication_id`, `user_id`, `publication_type_id`, `creation_date`, `title`, `description`, `expiration_date`, `category_id`, `subcategory_id`, `views`, `process_state_id`) values('2','2','1','2014-05-29 00:00:00','Ayuda','landdnjadsadsa','2015-12-01 00:00:00','1','1','1','V');
insert into `publication` (`publication_id`, `user_id`, `publication_type_id`, `creation_date`, `title`, `description`, `expiration_date`, `category_id`, `subcategory_id`, `views`, `process_state_id`) values('3','1','2','2014-05-29 00:00:00','Tengo una silla de ruedas.','Me sobra una silla\r\n','2015-12-01 00:00:00','1','1','2','V');
insert into `publication` (`publication_id`, `user_id`, `publication_type_id`, `creation_date`, `title`, `description`, `expiration_date`, `category_id`, `subcategory_id`, `views`, `process_state_id`) values('4','1','2','2014-05-29 00:00:00','Zapatillas','Tengo unas zapatillas para donar','2015-12-01 00:00:00','1','1','21','V');
insert into `publication` (`publication_id`, `user_id`, `publication_type_id`, `creation_date`, `title`, `description`, `expiration_date`, `category_id`, `subcategory_id`, `views`, `process_state_id`) values('133','1','2','2014-05-29 00:00:00','Necesito un colchon','La inundaciòn de el pasado temporal en la ciudad de Lujan nos ha dejado sin nada. Es de suma importancia que puedan colaborar con la gente como yo que ha perdido todo por obra de la naturaleza. En este momento estamos durmiendo con mi familia en el piso del patio de una casa que nos han prestado. Por favor colaboraciòn.','2015-12-01 00:00:00','1','1','11','V');

insert into `publication_favorite` (`favorite_id`, `publication_id`, `user_id`, `start_date`) values('2','133','2','2014-09-01 00:00:00');
insert into `publication_favorite` (`favorite_id`, `publication_id`, `user_id`, `start_date`) values('7','4','1','2014-11-09 18:46:09');
insert into `publication_favorite` (`favorite_id`, `publication_id`, `user_id`, `start_date`) values('9','3','1','2014-11-09 18:49:18');

insert into `publication_image` (`publication_id`, `image_id`, `path`) values('1','1','\\ayudaresfacil\\client\\src\\upload\\colchon (1).jpg');
insert into `publication_image` (`publication_id`, `image_id`, `path`) values('2','2','\\ayudaresfacil\\client\\src\\upload\\silla (1).jpg');
insert into `publication_image` (`publication_id`, `image_id`, `path`) values('2','5','\\ayudaresfacil\\client\\src\\upload\\colchon (3).jpg');
insert into `publication_image` (`publication_id`, `image_id`, `path`) values('3','4','\\ayudaresfacil\\client\\src\\upload\\silla (3).jpg');
insert into `publication_image` (`publication_id`, `image_id`, `path`) values('4','6','\\ayudaresfacil\\client\\src\\upload\\zapatilla (1).jpg');
insert into `publication_image` (`publication_id`, `image_id`, `path`) values('133','3','\\ayudaresfacil\\client\\src\\upload\\zapatilla (3).jpg');
insert into `publication_image` (`publication_id`, `image_id`, `path`) values('133','6','\\ayudaresfacil\\client\\src\\upload\\silla (2).jpg');

insert into `publication_object` (`publication_id`, `object_id`, `quantity`) values('1','3','1');
insert into `publication_object` (`publication_id`, `object_id`, `quantity`) values('2','1','1');
insert into `publication_object` (`publication_id`, `object_id`, `quantity`) values('3','1','1');
insert into `publication_object` (`publication_id`, `object_id`, `quantity`) values('4','3','1');
insert into `publication_object` (`publication_id`, `object_id`, `quantity`) values('133','2','1');

insert into `publication_sponsor` (`sponsor_id`, `publication_id`, `user_tw`) values('1','133','@seperez');
insert into `publication_sponsor` (`sponsor_id`, `publication_id`, `user_tw`) values('3','133','@sabricasado');

insert into `publication_vote` (`vote_id`, `publication_id`, `user_id`) values('1','1','1');
insert into `publication_vote` (`vote_id`, `publication_id`, `user_id`) values('2','133','2');





