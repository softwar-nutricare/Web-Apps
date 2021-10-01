import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Client} from "../../model/client";
import {ClientsService} from "../../services/clients.service";
import {Observable} from "rxjs";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule } from '@angular/material/dialog';
import {catchError, retry} from "rxjs/operators";


@Component({
  selector: 'app-dialog-create',
  templateUrl: './dialog-create.component.html',
  styleUrls: ['./dialog-create.component.css']
})
export class DialogCreateComponent implements OnInit {

  formValue !: FormGroup;
  clientModelObj: Client = new Client();
  clientsData !: any;
  constructor(private formbuilder: FormBuilder, private clientsService: ClientsService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      username: [''],
      password: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      cnpNumber: [''],
      datetime: ['']
    })
    this.getAllClients();
  }
  createClientDetails() {
    this.clientModelObj.username = this.formValue.value.username;
    this.clientModelObj.password = this.formValue.value.password;
    this.clientModelObj.firstName = this.formValue.value.firstName;
    this.clientModelObj.lastName = this.formValue.value.lastName;
    this.clientModelObj.email = this.formValue.value.email;
    

    this.clientsService.create(this.clientModelObj).subscribe(response =>{
      console.log(response);
      alert('Client Added Successfully')
      this.formValue.reset();
      this.getAllClients();
    },
      err=> {
      alert('Something Went Wrong');
    })
  };
  getAllClients() {
    this.clientsService.getAll()
      .subscribe( response => {
        this.clientsData = response;
      })
  }


}
