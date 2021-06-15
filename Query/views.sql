# View: Display Employee Information
create view employee_info as 
select employee_name, sex, contact_no from hospital.employee;

# View: Display Patient Admitted to the Hospital
create view patient_admitted as
select patient_name, sex, admit_date from hospital.patient;

# View: Display Current Appointments
create view current_appointments as
select appointment_id, datetime, description from hospital.appointment;

# View: Rooms that are available
create view available_rooms as
select room_id, room_type
from hospital.room
where occupancy=false;

# View: Display Treatments that are not Finished
# TODO: create view unfinished_treatments ...

# TESTS
select * from employee_info;
select * from patient_admitted;
select * from current_appointments;
select * from available_rooms;
#select * from unfinished_treatments;
