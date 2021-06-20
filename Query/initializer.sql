create schema if not exists hospital;

create table hospital.room (
	room_id      int,
	occupancy    bool,
	room_type  varchar(20) not null,
	primary key (room_id)
);

create table hospital.address (
	address_id      int,
	city    varchar(20) not null,
    town varchar(20) not null,
    street varchar(20) not null,
    apt_no  int,
    door int,
	primary key (address_id)
);

create table hospital.treatment (
	treatment_id int,
	period varchar(20) not null,
    description    varchar(100) not null,
	primary key (treatment_id)
);

create table hospital.patient (
	patient_id      int,
	identity_number    int,
	patient_name  varchar(20) not null,
    sex  varchar(20) not null,
    address_id int,
    contact_no int,
    companion_no int,
    admit_date varchar(20) not null,
    discard_date varchar(20) not null,
    room_id int,
    treatment_id int,
    primary key (patient_id),
	foreign key (address_id) references address(address_id)
		on delete set null,
	foreign key (room_id) references room(room_id)
		on delete set null,
	foreign key (treatment_id) references treatment(treatment_id)
		on delete set null
);

create table hospital.appointment (
	appointment_id      int,
	description    varchar(100) not null,
	datetime  varchar(20) not null,
	patient_id  int,
	primary key (appointment_id),
	foreign key (patient_id) references patient(patient_id)
		on delete set null
);

create table hospital.employee (
	employee_id      int,
	contact_no int,
    address_id int,
    employee_name varchar(20) not null,
    sex  varchar(20) not null,
    base_salary int,
    primary key (employee_id),
	foreign key (address_id) references address(address_id)
		on delete set null
);

create table hospital.medicine (
	medicine_id int,
	price int,
    primary key (medicine_id)
);

create table hospital.doctor (
	doctor_id int, 
	employee_id int,
	patient_id int,
    position varchar(20) not null,
    primary key (doctor_id),
	foreign key (patient_id) references patient(patient_id)
		on delete set null,
	foreign key (employee_id) references employee(employee_id)
    on delete set null
);

create table hospital.secretary (
	secretary_id int, 
	employee_id int,
	appointment_id int,
    primary key (secretary_id),
    foreign key (employee_id) references employee(employee_id),
	foreign key (appointment_id) references appointment(appointment_id)
		on delete set null
);

create table hospital.nurse (
	nurse_id int, 
	employee_id int,
	room_id int,
    primary key (nurse_id),
	foreign key (employee_id) references employee(employee_id),
	foreign key (room_id) references room(room_id)
		on delete set null
);
