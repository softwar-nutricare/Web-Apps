import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {NutritionistsService} from "../../services/nutritionists.service";
import {Nutritionist} from "../../model/nutritionist";
import {NgForm} from "@angular/forms";
import * as _ from 'lodash';
import {MatDialog} from "@angular/material/dialog";
import {DialogCreateComponent} from "../dialog-create/dialog-create.component";

@Component({
  selector: 'app-nutritionists',
  templateUrl: './nutritionists.component.html',
  styleUrls: ['./nutritionists.component.css']
})
export class NutritionistsComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'username', 'password', 'firstName', 'lastName', 'email', 'cnpNumber', 'datetime', 'actions'];
  nutritionistData: Nutritionist;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  @ViewChild('nutritionistForm', {static: false})
  nutritionistForm!: NgForm;

  isEditMode = false;

  constructor(private nutritionistService: NutritionistsService, public dialog: MatDialog) {
    this.nutritionistData = {} as Nutritionist;
    this.dataSource = new MatTableDataSource<any>();
  }

  // Methods
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllNutritionists();
  }

  getAllNutritionists() {
    this.nutritionistService.getAll().subscribe( (response: any) => {
      this.dataSource.data = response;
    });
  }

  editItem(element: Nutritionist) {
    this.nutritionistData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.nutritionistForm.resetForm();
  }

  deleteItem(id: number) {
    this.nutritionistService.delete(id).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.filter((o: Nutritionist) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  addStudent() {
    this.nutritionistService.update(this.nutritionistData.id, this.nutritionistData).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o: Nutritionist) => {
        if (o.id == response.id) {
          o = response;
        }
        return o;
      });
      this.cancelEdit();
    });
  }

  updateStudent() {
    this.nutritionistService.update(this.nutritionistData.id, this.nutritionistData).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o: Nutritionist) => {
        if (o.id === response.id) {
          o = response;
        }
        return o;
      });
      this.cancelEdit();
    });
  }

  onSubmit() {
    if (this.nutritionistForm.form.valid) {
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
