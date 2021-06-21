# After running any trigger, you may need to re-initialize records in db for testing.
# i.e. insert old records again after running a delete operation and trigger.
DELIMITER $$
create trigger hospital.delete_doctor before delete on hospital.doctor
for each row
	begin
		set @address_id = (
			select address_id
			  from hospital.employee
			 where old.employee_id = hospital.employee.employee_id);
		# remove address of the doctor first
		delete from hospital.address where @address_id=hospital.address.address_id;
		# remove employee record belongs the doctor
		delete from hospital.employee where old.employee_id = hospital.employee.employee_id;

		# foreign key (doctor_id) references doctor(doctor_id) on delete set null in patient table
		# sets value of patient_id attribute to null
	end$$
DELIMITER ;

# Test: delete_doctor
select * from hospital.doctor;
select * from hospital.employee;
select * from hospital.address;
select * from hospital.patient;
delete from hospital.doctor where doctor_id=200;
# Note that address of the doctor is removed and value of the doctor_id attribute becomes null.  
select * from hospital.doctor;
select * from hospital.employee;
select * from hospital.address;
select * from hospital.patient;