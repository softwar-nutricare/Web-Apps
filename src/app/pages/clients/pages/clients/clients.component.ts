import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ClientsService} from "../../services/clients.service";
import {Client} from "../../model/client";
import {NgForm} from "@angular/forms";
//import * as _ from 'lodash';
import {MatDialog} from "@angular/material/dialog";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import {DialogCreateComponent} from "../dialog-create/dialog-create.component";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'username', 'password', 'firstName', 'lastName', 'email', 'cnpNumber', 'datetime', 'actions'];
  clientData: Client;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  @ViewChild('clientForm', {static: false})
  clientForm!: NgForm;

  isEditMode = false;

  constructor(private clientService: ClientsService, public dialog: MatDialog) {
    this.clientData = {} as Client;
    this.dataSource = new MatTableDataSource<any>();
  }

  // Methods
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllClients();
  }

  getAllClients() {
    this.clientService.getAll().subscribe( (response: any) => {
      this.dataSource.data = response;
    });
  }

  editItem(element: Client) {
    /*this.clientData = _.cloneDeep(element);
    this.isEditMode = true;*/
  }

  cancelEdit() {
    this.isEditMode = false;
    this.clientForm.resetForm();
  }

  deleteItem(id: number) {
    this.clientService.delete(id).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.filter((o: Client) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  addStudent() {
    this.clientService.update(this.clientData.id, this.clientData).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o: Client) => {
        if (o.id == response.id) {
          o = response;
        }
        return o;
      });
      this.cancelEdit();
    });
  }

  updateStudent() {
    this.clientService.update(this.clientData.id, this.clientData).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o: Client) => {
        if (o.id === response.id) {
          o = response;
        }
        return o;
      });
      this.cancelEdit();
    });
  }

  onSubmit() {
    if (this.clientForm.form.valid) {
      if (this.isEditMode) {
        this.updateStudent();
      } else {
        this.addStudent();
      }
    } else {
      console.log('Invalid data');
    }
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogCreateComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
