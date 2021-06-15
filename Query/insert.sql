insert into hospital.room values (1, true, "care room" );
insert into hospital.room values (2, true, "care room" );
insert into hospital.room values (3, true, "care room" );
insert into hospital.room values (4, false, "operation room" );
insert into hospital.room values (5, false, "operation room" );

insert into hospital.address values (100, "Los Angeles" , "Siettle", "Downwards", 5, 2);
insert into hospital.address values (101, "Los Angeles" , "New Cattle", "Downwards", 9, 3);
insert into hospital.address values (102, "Los Angeles" , "Freddy", "Downwards", 2, 11);
insert into hospital.address values (103, "Los Angeles" , "Longbeach", "Downwards", 4, 8);
insert into hospital.address values (104, "Los Angeles" , "Jackony", "Downwards", 4, 9);
insert into hospital.address values (105, "Los Angeles" , "Shortbeach", "Downwards", 0, 13);
insert into hospital.address values (106, "Los Angeles" , "Verticci", "Downwards", 1, 22);
insert into hospital.address values (107, "Los Angeles" , "Horral", "Downwards", 5, 33);
insert into hospital.address values (108, "Los Angeles" , "Cready", "Downwards", 1, 2);
insert into hospital.address values (109, "New Jersey" , "Upwards", "Downwards", 3, 0);

insert into hospital.patient values (3000, 183759101, "John Conner" , "male", 100, 321432424, 907887543, "20.12.2010", "21.12.2010", 1);
insert into hospital.patient values (3001, 499088823, "Mary Jane Token" , "female", 101, 343622439, 197287547, "11.11.2011", "11.11.2012", 2);
insert into hospital.patient values (3002, 908964332, "John Conner" , "male", 102, 925430489, 56791772, "01.08.2020", "01.06.2021", 3);


insert into hospital.employee values (1, 96727111, 100, "Cory Hintz", "male",  5000 );
insert into hospital.employee values (2, 14782051 , 101, "Elsa Sauer", "male",  7000 );
insert into hospital.employee values (3, 15802472, 102, "Geovanny Beahan Jr.", "male",  3000 );
insert into hospital.employee values (4, 17034905, 103, "Izaiah Orn", "male",  4000 );
insert into hospital.employee values (5, 63158021, 104, "Shayne Schimmel DVM", "female",  10000 );
insert into hospital.employee values (6, 19416678, 105, "Mariela Klocko DDS", "male",  7000 );
insert into hospital.employee values (7, 19936866, 106, "Cordie Emmerich", "male",  2500 );
insert into hospital.employee values (8, 70485441, 107, "Joanny Beer", "female",  3500 );
insert into hospital.employee values (9, 35134161, 108, "Bartholome Dach", "male",  4000 );
insert into hospital.employee values (10, 20662452, 109, "Kaela Rutherford", "male",  9000 );

insert into hospital.doctor values (200, 1, 3000, "staffed");
insert into hospital.doctor values (201, 2, 3001, "staffed");
insert into hospital.doctor values (202, 3, 3002, "contractual");

insert into hospital.nurse values (200, 4, 1);
insert into hospital.nurse values (201, 5, 2);
insert into hospital.nurse values (202, 6, 3);
insert into hospital.nurse values (203, 7, 4);

insert into hospital.appointment values (1, "Check-up" , "01.01.2012 12:00" , 3000);
insert into hospital.appointment values (2, "Emergency" , "12.10.2013 21:34" , 3001);
insert into hospital.appointment values (3, "Dental" , "16.09.2014 00:53" , 3002);

insert into hospital.secretary values (200, 8, 1);
insert into hospital.secretary values (201, 9, 2);
insert into hospital.secretary values (202, 10, 3);


insert into hospital.medicine values (10000, 500);
insert into hospital.medicine values (10001, 300);
insert into hospital.medicine values (10002, 450);
insert into hospital.medicine values (10003, 100);
insert into hospital.medicine values (10004, 200);
insert into hospital.medicine values (10005, 250);

insert into hospital.treatment values (10000, "Two weeks", "Rest");
insert into hospital.treatment values (10001, "One month", "Drug");
insert into hospital.treatment values (10002, "Three days", "Dental cleaning");
insert into hospital.treatment values (10003, "One year", "Chemotherapy");



