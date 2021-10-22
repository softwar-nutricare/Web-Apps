import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ClientsService} from "../../services/clients.service";
import {Client} from "../../model/client";
import {FormBuilder, FormGroup,NgForm} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  formValue !: FormGroup;
  clientModelObj: Client = new Client();
  displayedColumns: string[] = ['id', 'username', 'password', 'firstName', 'lastName', 'email', 'datetime', 'actions'];
  clientData: Client;
  showAdd!: boolean;
  showUpdate!: boolean;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  @ViewChild('clientForm', {static: false})
  clientForm!: NgForm;

  isEditMode = false;

  constructor(private clientService: ClientsService, public dialog: MatDialog,
    private formbuilder: FormBuilder) {
    this.clientData = {} as Client;
    this.dataSource = new MatTableDataSource<any>();
  }

  // Methods
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.formValue = this.formbuilder.group({
      username: [''],
      password: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      datetime: ['']
    });
    this.getAllClients();
  }

  getAllClients() {
    this.clientService.getAll().subscribe( (response: any) => {
      this.dataSource.data = response;
    });
  }
  clickAddClient() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  createNutritionistDetails() {
    this.clientModelObj.username = this.formValue.value.username;
    this.clientModelObj.password = this.formValue.value.password;
    this.clientModelObj.firstName = this.formValue.value.firstName;
    this.clientModelObj.lastName = this.formValue.value.lastName;
    this.clientModelObj.email = this.formValue.value.email;
    this.clientModelObj.datetime = this.formValue.value.datetime;

    this.clientService.create(this.clientModelObj).subscribe(response =>{
        console.log(response);
        alert('Client Added Successfully')
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllClients();
      },
      err=> {
        alert('Something Went Wrong');
      })
  };

  updateNutritionistDetails() {
    this.clientModelObj.username = this.formValue.value.username;
    this.clientModelObj.password = this.formValue.value.password;
    this.clientModelObj.firstName = this.formValue.value.firstName;
    this.clientModelObj.lastName = this.formValue.value.lastName;
    this.clientModelObj.email = this.formValue.value.email;
    this.clientModelObj.datetime = this.formValue.value.datetime;

    this.clientService.update(this.clientModelObj, this.clientModelObj.id)
      .subscribe(response  => {
        alert("Updated Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllClients();
      })
  }

  deleteItem(id: number) {
    this.clientService.delete(id).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.filter((o: Client) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  cancelEdit() {
    this.isEditMode = false;
    this.clientForm.resetForm();
  }

  onEdit(item: any) {
    this.showAdd = false;
    this.showUpdate = true;

    this.clientModelObj.id = item.id;
    this.formValue.controls['username'].setValue(item.username);
    this.formValue.controls['password'].setValue(item.password);
    this.formValue.controls['firstName'].setValue(item.firstName);
    this.formValue.controls['lastName'].setValue(item.lastName);
    this.formValue.controls['email'].setValue(item.email);
    this.formValue.controls['datetime'].setValue(item.datetime);
  }

}
