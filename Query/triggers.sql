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


DELIMITER $$
create trigger hospital.update_room_on_discard before update on hospital.patient
for each row
    begin
        set @current_room_id = (select room_id from hospital.patient where old.patient_id = hospital.patient.patient_id);

        if old.discard_date <= CURDATE() then
            update hospital.room set room.occupancy=false where room.room_id = @current_room_id;
        end if;
    end$$
DELIMITER ;

DROP TRIGGER if exists hospital.update2;
DELIMITER $$
create trigger hospital.update2 before insert on hospital.patient
for each row
    begin
        set @empty_room = (
            select min(room_id) from hospital.room where occupancy=false
        );

        if @empty_room is not null then 
			set new.room_id = @empty_room;
			update room set room.occupancy=true where room.room_id = @empty_room;
        end if;

    end$$
DELIMITER ;

#Set room available after patient delete
DROP TRIGGER if exists hospital.update_room_on_delete;
DELIMITER $$
create trigger hospital.update_room_on_delete before delete on hospital.patient
for each row
	begin
		set @old_patient_id = old.patient_id;
		set @old_room_id = (select room_id from hospital.patient where patient_id=@old_patient_id);
		update room set room.occupancy=false where room.room_id = @old_room_id;
	end$$
DELIMITER ;



