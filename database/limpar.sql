use cardio_clinica;

delete from consultas;
delete from pessoas;

alter table consultas auto_increment=1;
alter table pessoas auto_increment=1;