import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {AppointmentsService} from "../../services/appointments.service";
import {Appointment} from "../../model/appointment";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  formValue !: FormGroup;
  appointmentModelObj: Appointment = new Appointment();
  displayedColumns: string[] = ['id', 'clientId', 'nutritionistId', 'assignedDietId', 'createdAt', 'appointmentDate', 'nutritionistNotes', 'actions'];
  appointmentData: Appointment;
  showAdd!: boolean;
  showUpdate!: boolean;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  @ViewChild('nutritionistForm', {static: false})
  appointmentForm!: NgForm;

  isEditMode = false;

  // Methods
  constructor(private appointmentService: AppointmentsService, public dialog: MatDialog,
              private formbuilder: FormBuilder) {
    this.appointmentData = {} as Appointment;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.formValue = this.formbuilder.group({
      clientId: [''],
      nutritionistId: [''],
      assignedDietId: [''],
      createdAt: [''],
      appointmentDate: [''],
      nutritionistNotes: [''],
    });
    this.getAllAppointments();
  }

  getAllAppointments() {
    this.appointmentService.getAll().subscribe( (response: any) => {
      this.dataSource.data = response;
    });
  }

  clickAddAppointment() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  createAppointmentDetails() {
    this.appointmentModelObj.clientId = this.formValue.value.clientId;
    this.appointmentModelObj.nutritionistId = this.formValue.value.nutritionistId;
    this.appointmentModelObj.assignedDietId = this.formValue.value.assignedDietId;
    this.appointmentModelObj.createdAt = this.formValue.value.createdAt;
    this.appointmentModelObj.appointmentDate = this.formValue.value.appointmentDate;
    this.appointmentModelObj.nutritionistNotes = this.formValue.value.nutritionistNotes;

    this.appointmentService.create(this.appointmentModelObj).subscribe(response =>{
        console.log(response);
        alert('Nutritionist Added Successfully')
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllAppointments();
      },
      err=> {
        alert('Something Went Wrong');
      })
  };

  updateAppointmentDetails() {
    this.appointmentModelObj.clientId = this.formValue.value.clientId;
    this.appointmentModelObj.nutritionistId = this.formValue.value.nutritionistId;
    this.appointmentModelObj.assignedDietId = this.formValue.value.assignedDietId;
    this.appointmentModelObj.createdAt = this.formValue.value.createdAt;
    this.appointmentModelObj.appointmentDate = this.formValue.value.appointmentDate;
    this.appointmentModelObj.nutritionistNotes = this.formValue.value.nutritionistNotes;

    this.appointmentService.update(this.appointmentModelObj, this.appointmentModelObj.id)
      .subscribe(response  => {
        alert("Updated Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllAppointments();
      })
  }

  deleteItem(id: number) {
    this.appointmentService.delete(id).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.filter((o: Appointment) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  cancelEdit() {
    this.isEditMode = false;
    this.appointmentForm.resetForm();
  }

  onEdit(item: any) {
    this.showAdd = false;
    this.showUpdate = true;

    this.appointmentModelObj.id = item.id;
    this.formValue.controls['clientId'].setValue(item.clientId);
    this.formValue.controls['nutritionistId'].setValue(item.nutritionistId);
    this.formValue.controls['assignedDietId'].setValue(item.assignedDietId);
    this.formValue.controls['createdAt'].setValue(item.createdAt);
    this.formValue.controls['appointmentDate'].setValue(item.appointmentDate);
    this.formValue.controls['nutritionistNotes'].setValue(item.nutritionistNotes);
  }

}
