drop database backend_test;
create database backend_test;
use backend_test;
drop database backend_development;
create database backend_development;
use backend_development;

show tables;
select * from Users;

show indexes from Users;
show indexes from Tokens;

desc Users;
desc Tokens;

CREATE TABLE IF NOT EXISTS `Users` (`id` VARCHAR(36) , `name` VARCHAR(36), `password` VARCHAR(256), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB COLLATE utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS `Tokens` (`id` INTEGER NOT NULL auto_increment , `token` VARCHAR(256), `type` VARCHAR(32), `expires` DATETIME, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `userId` VARCHAR(36) NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE) ENGINE=InnoDB COLLATE utf8mb4_unicode_ci;
