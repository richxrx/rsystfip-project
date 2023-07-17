CREATE TABLE `cancelled` (
  `person_id` int(11) UNSIGNED NOT NULL COMMENT 'Campo que guarda el id de la persona que se va a cancelar la cita.',
  `date` char(19) NOT NULL DEFAULT current_timestamp() COMMENT 'Campo que guarda la fecha y hora en la que se cancela la cita.',
  `cancelled_asunt` varchar(150) NOT NULL COMMENT 'Campo que guarda el asunto por el cual se cancela la cita.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tabla que almacena las citas canceladas.';

INSERT INTO `cancelled` (`person_id`, `date`, `cancelled_asunt`) VALUES
(4, '2023-07-14 21:11:29', 'In quisquam in autem ut consequuntur consectetur tenetur sunt exercitationem sunt magna ut corrupti aliquid voluptatibus sequi'),
(7, '2023-07-15 09:23:34', 'Ad id aut duis ad corporis neque sed officia eligendi corrupti'),
(6, '2023-07-15 09:23:39', 'Ipsam blanditiis suscipit laboris voluptas qui officia repudiandae'),
(12, '2023-07-15 09:33:14', 'Laudantium laborum Nesciunt nesciunt iste error eum do distinctio Perferendis sunt ratione facere est officiis'),
(12, '2023-07-15 09:33:20', 'Exercitationem sunt do eos error laudantium rerum iste ut sit velit consequuntur saepe ea repudiandae neque laboriosam sunt'),
(11, '2023-07-15 09:33:28', 'Qui ad iusto vel in quis amet quia totam consequatur quasi numquam illum repellendus Esse minima excepturi iste aut'),
(10, '2023-07-15 09:33:37', 'Ullamco id dolorem ipsa quasi perspiciatis'),
(9, '2023-07-15 09:36:46', 'Ut recusandae Distinctio Ipsam dolore a velit laudantium nostrum libero dolorem rerum corporis molestias suscipit quia proident amet omnis molest'),
(8, '2023-07-15 09:36:55', 'Sed deserunt tempora iure alias ut autem adipisci eu ea sunt rerum voluptatem et beatae sed omnis nesciunt sunt nulla'),
(15, '2023-07-15 09:39:50', 'Perferendis ea velit maxime facilis voluptatem'),
(17, '2023-07-15 09:39:56', 'Rem quas odit dolore anim omnis ea eius'),
(14, '2023-07-15 09:40:04', 'Tempora aliquam eligendi accusantium quasi distinctio Sequi fugiat occaecat explicabo Sed quasi repellendus Quo'),
(16, '2023-07-15 09:40:14', 'Omnis in adipisci amet saepe et est reprehenderit repellendus Repellendus Impedit vel autem molestiae dolor laboris dolore exercitation'),
(18, '2023-07-15 09:40:20', 'Sunt quidem reprehenderit delectus est ut');

CREATE TABLE `categories` (
  `id` int(11) UNSIGNED NOT NULL COMMENT 'Campo que guarda el id del tipo de persona (autoincremental).',
  `category` varchar(15) NOT NULL COMMENT 'Campo que guarda el nombre del tipo de persona, clasificado por categoria.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tabla que almacena los diferentes tipos de persona clasificada por categoria, usada para los agendamientos.';

INSERT INTO `categories` (`id`, `category`) VALUES
(1, 'Docente'),
(2, 'Estudiante'),
(3, 'Coordinador'),
(4, 'Decano'),
(5, 'Otro (externo)');

CREATE TABLE `deans` (
  `id` char(11) NOT NULL COMMENT 'Campo que guarda el numero de cedula del de decano del ITFIP, (unique).',
  `dean` varchar(50) NOT NULL COMMENT 'Campo que guarda el nombre de decano del ITFIP.',
  `faculty_id` int(11) NOT NULL COMMENT 'Campo que guarda el id de facultad a la que pertenece el decano del ITFIP.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tabla que almacena los datos de decanos del ITFIP, que seran utilizados para el agendamiento de personas mas rapidamente, haciendo un autocompletado.';

INSERT INTO `deans` (`id`, `dean`, `faculty_id`) VALUES
('65701167', 'MacKensie Guerrero', 2),
('657013893', 'Wayne Sandoval', 3),
('81758685', 'Orlando Emerson', 1),
('96658562', 'Jerome Howe', 2);

CREATE TABLE `documents` (
  `id` int(11) UNSIGNED NOT NULL COMMENT 'Campo que guarda el id del tipo de documento, (autoincremental).',
  `document` varchar(3) NOT NULL COMMENT 'Campo que guarda una abreviacion corta del tipo de documento.',
  `description` varchar(40) NOT NULL COMMENT 'Campo que guarda el nombre detallado del tipo de documento.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tabla que almacena los tipos de documentos, que seran utilizados para el agendamiento de personas.';

INSERT INTO `documents` (`id`, `document`, `description`) VALUES
(1, 'CC', 'Cédula Ciudadanía'),
(2, 'TI', 'Tarjeta Identidad'),
(3, 'CE', 'Cédula Extranjería'),
(4, 'PA', 'Pasaporte');

CREATE TABLE `faculties` (
  `id` int(11) UNSIGNED NOT NULL COMMENT 'Campo que guarda el id de la facultad, (autoincremental).',
  `facultie` varchar(60) NOT NULL COMMENT 'Campo que guarda el nombre de la facultad.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tabla que almacena las facultades actuales de los programas academicos del ITFIP.';

INSERT INTO `faculties` (`id`, `facultie`) VALUES
(1, 'Economía, Administración y Contaduría Pública'),
(2, 'Ingeniería y Ciencias Agroindustriales'),
(3, 'Ciencias Sociales, Salud y Educación'),
(4, 'No aplica');

CREATE TABLE `people` (
  `id` int(11) UNSIGNED NOT NULL COMMENT 'Campo que guarda el id de las personas agendadas (autoincremental).',
  `name` varchar(50) NOT NULL COMMENT 'Campo que guarda el nombre completo de las personas agendadas.',
  `document_id` int(11) NOT NULL COMMENT 'Campo que guarda el id del tipo de documento referenciado de la tabla document.',
  `document_number` char(11) NOT NULL COMMENT 'Campo que guarda el numero de documento de las personas agendadas.',
  `telephone` char(10) DEFAULT NULL COMMENT 'Campo que guarda el numero de telefono de contacto.',
  `email` varchar(30) DEFAULT NULL COMMENT 'Campo que guarda el correo electronico de contacto.',
  `category_id` int(11) NOT NULL COMMENT 'Campo que guarda el id del tipo de persona referenciado de la tabla person_type.',
  `faculty_id` int(11) NOT NULL DEFAULT 4 COMMENT 'Campo que guarda el id de la facultad a la que pertenece referenciado de la tabla faculties.',
  `come_asunt` varchar(150) NOT NULL COMMENT 'Campo que guarda el asunto, motivo o razon de la visita a la rectoria, para su posterior agendamiento.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tabla que almacena todos los datos personales de las personas que han sido agendadas.';

INSERT INTO `people` (`id`, `name`, `document_id`, `document_number`, `telephone`, `email`, `category_id`, `faculty_id`, `come_asunt`) VALUES
(1, 'MacKensie Guerrero', 1, '65701167', NULL, NULL, 4, 2, 'Cum cumque non duis culpa recusandae Eiusmod quod eveniet est quis deserunt dolor quis id adipisci dolorum ipsam est non'),
(2, 'Venus Francis', 2, '65701167', '3173926578', 'wonok@mailinator.com', 3, 1, 'Voluptate laborum Dolores praesentium eaque nisi'),
(3, 'Dorian Vinson', 2, '45565859', '3173926578', 'rrojas48@itfip.edu.co', 3, 3, 'Ut doloribus voluptatem aut in illo nisi sint unde excepturi qui consequatur asperiores ipsum quaerat error repudiandae minima'),
(4, 'Camilla Oneill', 3, '91585434', '3173926578', 'rojasricor@gmail.com', 2, 1, 'Sint possimus assumenda fugit proident eu Nam soluta aliqua Quis mollit inventore aut qui nisi'),
(5, 'Dora Bentley', 2, '74848578', '3173926578', 'tyvi@mailinator.com', 1, 1, 'Nisi qui nulla ad rerum eius expedita eu qui harum non quis'),
(6, 'Selma Kim', 4, '657016378', '3173926578', 'leliwuqiv@mailinator.com', 3, 2, 'Voluptatem Amet aliqua Est enim cum vero sed maxime praesentium repellendus Aliqua Eu fuga'),
(7, 'Wayne Sandoval', 1, '657013893', '3193884445', 'wehopohab@mailinator.com', 4, 3, 'Cumque aute deserunt est eum provident adipisicing proident architecto dolorem harum voluptatibus commodo error'),
(8, 'Neve Tucker', 2, '65701167', '3173926578', 'puwy@mailinator.com', 5, 4, 'Facere voluptatem Consectetur sit et quas modi cillum et'),
(9, 'Bryar Simon', 2, '65701167', '3173926578', 'hytogig@mailinator.com', 2, 4, 'Tempor consequat Aperiam omnis culpa distinctio Est ut cupiditate quia quas reiciendis voluptatem quia earum dolore qui'),
(10, 'Cade Decker', 1, '65701167', '3173926578', 'cosufacile@mailinator.com', 1, 4, 'Aut tempore dolore mollitia ad sit consectetur iste ea esse consequatur Et voluptatem Exercitationem adipisicing'),
(11, 'Abdul Hopkins', 3, '65701167', '3173926578', 'diquzihax@mailinator.com', 5, 2, 'Sit in recusandae Explicabo Id rerum adipisci et asperiores vel animi'),
(12, 'Victor Kemp', 2, '82575906', '3173926578', 'hipote@mailinator.com', 3, 1, 'Do quam necessitatibus cumque non'),
(13, 'Gillian Hull', 3, '736894055', '3173926578', 'juzabar@mailinator.com', 1, 1, 'Dolores suscipit fugiat quo qui voluptas explicabo Quia cumque aperiam molestiae iusto'),
(14, 'Quincy Hudson', 3, '658956866', '3173926578', 'geneze@mailinator.com', 5, 1, 'At blanditiis voluptatem consectetur quas ea aut consequatur culpa amet minim'),
(15, 'Farrah Walsh', 2, '657894966', '3179329405', 'xoluca@mailinator.com', 3, 3, 'Doloribus neque corrupti sit doloremque illo saepe dolor exercitationem provident provident dolor dolorem sed impedit facere corporis maiores'),
(16, 'Zeph Hooper', 1, '65701167', '3173926578', 'syhojikuv@mailinator.com', 1, 4, 'Reiciendis dolor consequatur Deleniti qui consectetur quas error recusandae Amet dolores voluptas laboriosam cumque eligendi laboris porro'),
(17, 'Omar Bentley', 1, '255795053', '3179326578', 'cuhyl@mailinator.com', 1, 2, 'Aliquid mollitia placeat tempor quod'),
(18, 'Nicole Savage', 2, '657905667', '3179362789', 'xopewebu@mailinator.com', 2, 1, 'Nihil ipsum laborum inventore pariatur Temporibus in Nam et deleniti pariatur Praesentium sunt'),
(19, 'Scott Holden', 1, '937589056', '3178399555', 'gumypyse@mailinator.com', 3, 2, 'Et itaque magni est soluta consequuntur ad quo quis consequatur nihil nulla aut ut consequatur dignissimos autem'),
(20, 'Odette York', 3, '65701167', '45', 'jujuvyv@mailinator.com', 1, 1, 'Voluptates a non impedit ut non qui officia et est assumenda id dolor dignissimos'),
(21, 'Teagan Preston', 1, '77759053', '3173926578', 'suraxuw@gmail.com', 3, 4, 'Praesentium nihil qui assumenda omnis placeat ipsam culpa adipisicing dolor ut officia quis minim dolore eum possimus tempora libero'),
(22, 'Jerome Howe', 3, '96658562', '3173926578', 'zagucu@mailinator.com', 4, 2, 'Itaque dolore expedita nostrud quo nihil assumenda mollit quia dolor in est impedit aute recusandae Reprehenderit in sit'),
(23, 'Eugenia Rodriquez', 4, '65701167', '3173926578', 'zecywyk@mailinator.com', 5, 3, 'Minima qui aut omnis asperiores incidunt consequat Cum consequuntur cupiditate pariatur Et temporibus mollit repudiandae et sequi'),
(24, 'Debra Winters', 1, '29589056', '3170394845', 'duwiby@mailinator.com', 2, 1, 'Duis voluptas et impedit optio autem vel vel ut quaerat nihil'),
(25, 'Scarlett Sweeney', 4, '65701167', '3173926578', 'golusujyn@mailinator.com', 3, 3, 'Laboriosam in sit incididunt provident ut ut dolorem fugiat veritatis vel consectetur nisi voluptatem corrupti aspernatur laboris quos laudantium');

CREATE TABLE `roles` (
  `id` enum('admin','rector','secretaria') NOT NULL COMMENT 'Campo que guarda el rol que tiene el usaurio, existen 3: admin, rector, secretaria.',
  `permissions` set('admin','add','schedule','reports','statistics') NOT NULL COMMENT 'Campo que guarda los permisos que tiene el usaurio'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tabla que almacena los roles de la aplicación.';

INSERT INTO `roles` (`id`, `permissions`) VALUES
('admin', 'admin,add,schedule,reports,statistics'),
('rector', 'schedule'),
('secretaria', 'add,schedule,reports,statistics');

CREATE TABLE `scheduling` (
  `person_id` int(11) UNSIGNED NOT NULL COMMENT 'Campo que almacena el id de la persona agendada, llave foranea del campo id de la tabla registered people.',
  `date_filter` char(19) NOT NULL DEFAULT current_timestamp() COMMENT 'Campo que guarda la fecha del agendamiento, utilizada para hacer busquedas en rango en  la base de datos.',
  `start_date` char(19) NOT NULL DEFAULT current_timestamp() COMMENT 'Campo que guarda la fecha y hora (datetime), de inicio de la visita a la rectoria, de la persona agendada.',
  `end_date` char(19) NOT NULL DEFAULT current_timestamp() COMMENT 'Campo que guarda la fecha y hora (datetime), de finalizacion de la visita a la rectoria, de la persona agendada.',
  `modification` char(19) NOT NULL DEFAULT current_timestamp() COMMENT 'Campo que guarda la ultima hora de modificacion (time), del registro en la base de datos.',
  `status` enum('scheduled','daily','cancelled') NOT NULL COMMENT 'Campo que guarda el tipo de agendamiento realizado, puede ser de dos tipos,agendamiento programado o agendamiento al dia.',
  `color` char(7) NOT NULL DEFAULT '#388cdc' COMMENT 'Campo que guarda un valor de texto correspondiente al color que tendra el registro al ser agendado.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tabla que almacena todos los agendamientos en fecha del aplicativo.';

INSERT INTO `scheduling` (`person_id`, `date_filter`, `start_date`, `end_date`, `modification`, `status`, `color`) VALUES
(1, '2023-07-14 10:45:05', '2023-07-14 10:45:05', '2023-07-14 10:45:05', '2023-07-14 10:45:05', 'daily', '#388cdc'),
(2, '2023-07-14 18:00:00', '2023-07-14 18:00:00', '2023-07-14 18:30:00', '2023-07-14 11:03:53', 'cancelled', '#d2b3ac'),
(3, '2023-07-15 15:00:00', '2023-07-15 15:00:00', '2023-07-15 15:30:00', '2023-07-14 20:48:55', 'cancelled', '#dd1ccc'),
(4, '2023-07-15 15:00:00', '2023-07-15 15:00:00', '2023-07-15 15:30:00', '2023-07-14 21:10:59', 'cancelled', '#1d63de'),
(6, '2023-07-15 14:30:00', '2023-07-15 14:30:00', '2023-07-15 15:00:00', '2023-07-15 09:22:41', 'cancelled', '#4601d0'),
(7, '2023-07-15 15:00:00', '2023-07-15 15:00:00', '2023-07-15 15:30:00', '2023-07-15 09:22:59', 'cancelled', '#681762'),
(8, '2023-07-15 16:00:00', '2023-07-15 16:00:00', '2023-07-15 16:30:00', '2023-07-15 09:26:23', 'cancelled', '#6866d3'),
(9, '2023-07-15 17:00:00', '2023-07-15 17:00:00', '2023-07-15 17:30:00', '2023-07-15 09:27:24', 'cancelled', '#530755'),
(10, '2023-07-15 18:00:00', '2023-07-15 18:00:00', '2023-07-15 18:30:00', '2023-07-15 09:27:54', 'cancelled', '#0a914e'),
(11, '2023-07-15 18:30:00', '2023-07-15 18:30:00', '2023-07-15 19:00:00', '2023-07-15 09:32:36', 'cancelled', '#c247e0'),
(12, '2023-07-15 19:30:00', '2023-07-15 19:30:00', '2023-07-15 20:00:00', '2023-07-15 09:32:48', 'cancelled', '#95ccb6'),
(13, '2023-07-15 10:30:00', '2023-07-15 10:30:00', '2023-07-15 11:00:00', '2023-07-15 09:37:37', 'scheduled', '#d4add0'),
(14, '2023-07-15 11:30:00', '2023-07-15 11:30:00', '2023-07-15 12:00:00', '2023-07-15 09:37:48', 'cancelled', '#62c1b4'),
(15, '2023-07-15 13:00:00', '2023-07-15 13:00:00', '2023-07-15 13:30:00', '2023-07-15 09:38:04', 'cancelled', '#32a7f8'),
(16, '2023-07-15 12:00:00', '2023-07-15 12:00:00', '2023-07-15 12:30:00', '2023-07-15 09:38:18', 'cancelled', '#150906'),
(17, '2023-07-15 12:30:00', '2023-07-15 12:30:00', '2023-07-15 13:00:00', '2023-07-15 09:38:31', 'cancelled', '#21a9ca'),
(18, '2023-07-15 10:00:00', '2023-07-15 10:00:00', '2023-07-15 10:30:00', '2023-07-15 09:38:47', 'cancelled', '#6eed40'),
(19, '2023-07-15 11:00:00', '2023-07-15 11:00:00', '2023-07-15 11:30:00', '2023-07-15 09:38:58', 'scheduled', '#f990e4'),
(20, '2023-07-17 15:25:36', '2023-07-17 15:25:36', '2023-07-17 15:25:36', '2023-07-17 15:25:36', 'daily', '#388cdc'),
(21, '2023-07-17 15:29:45', '2023-07-17 15:29:45', '2023-07-17 15:29:45', '2023-07-17 15:29:45', 'daily', '#388cdc'),
(22, '2023-07-17 16:49:59', '2023-07-17 16:49:59', '2023-07-17 16:49:59', '2023-07-17 16:49:59', 'daily', '#388cdc'),
(23, '2023-07-17 18:00:00', '2023-07-17 18:00:00', '2023-07-17 18:30:00', '2023-07-17 16:50:18', 'scheduled', '#a09a41'),
(24, '2023-07-17 17:03:46', '2023-07-17 17:03:46', '2023-07-17 17:03:46', '2023-07-17 17:03:46', 'daily', '#388cdc'),
(25, '2023-07-17 19:30:00', '2023-07-17 19:30:00', '2023-07-17 20:00:00', '2023-07-17 17:04:06', 'scheduled', '#cd8640');

CREATE TABLE `users` (
  `id` int(11) UNSIGNED NOT NULL COMMENT 'Campo que guarda el id de los usuarios del aplicativo, con acceso permitido (unique).',
  `name` varchar(25) NOT NULL COMMENT 'Campo que guarda el nombre de los usuarios del aplicativo, con acceso permitido.',
  `lastname` varchar(25) NOT NULL COMMENT 'Campo que guarda el apellido de los usuarios del aplicativo, con acceso permitido.',
  `document_id` int(11) NOT NULL COMMENT 'Campo que almacena el id del tipo de documento, de la tabla document.',
  `document_number` char(11) NOT NULL COMMENT 'Campo que guarda el numero de documento.',
  `tel` char(10) NOT NULL COMMENT 'Campo que guarda el numero de telefono de contacto.',
  `email` varchar(30) NOT NULL COMMENT 'Campo que guarda el correo electronico institucional o usuario de acceso al aplicativo.',
  `password` char(60) NOT NULL COMMENT 'Campo que guarda el password de acceso al aplicativo (encriptado).',
  `role` enum('admin','rector','secretaria') NOT NULL COMMENT 'Campo que guarda el rol que tiene el usaurio, existen 3: admin, rector, secretaria.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tabla que almacena los usuarios del aplicativo, y sus respectivos usuarios y password de acceso al aplicativo.';

INSERT INTO `users` (`id`, `name`, `lastname`, `document_id`, `document_number`, `tel`, `email`, `password`, `role`) VALUES
(3, 'Ricardo Andrés', 'Rojas Rico', 1, '1111122448', '3173926578', 'rrojas48@itfip.edu.co', '$2a$10$H1WgM8Sy6gnf3s7cQlcMEODhLIN1n01kWjNtI5zZa78MRnv6xHf16', 'admin');


ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `deans`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `faculties`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `people`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `categories`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Campo que guarda el id del tipo de persona (autoincremental).', AUTO_INCREMENT=6;

ALTER TABLE `documents`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Campo que guarda el id del tipo de documento, (autoincremental).', AUTO_INCREMENT=6;

ALTER TABLE `faculties`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Campo que guarda el id de la facultad, (autoincremental).', AUTO_INCREMENT=5;

ALTER TABLE `people`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Campo que guarda el id de las personas agendadas (autoincremental).', AUTO_INCREMENT=26;

ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Campo que guarda el id de los usuarios del aplicativo, con acceso permitido (unique).', AUTO_INCREMENT=4;
COMMIT;
