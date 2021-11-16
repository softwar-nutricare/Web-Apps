import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {NutritionistsService} from "../../services/nutritionists.service";
import {Nutritionist} from "../../model/nutritionist";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-nutritionists',
  templateUrl: './nutritionists.component.html',
  styleUrls: ['./nutritionists.component.css']
})
export class NutritionistsComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  formValue !: FormGroup;
  nutritionistModelObj: Nutritionist = new Nutritionist();
  displayedColumns: string[] = ['id', 'username', 'password', 'firstName', 'lastName', 'email', 'cnpNumber', 'datetime', 'actions'];
  nutritionistData: Nutritionist;
  showAdd!: boolean;
  showUpdate!: boolean;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  @ViewChild('nutritionistForm', {static: false})
  nutritionistForm!: NgForm;

  isEditMode = false;

  constructor(private nutritionistService: NutritionistsService, public dialog: MatDialog,
              private formbuilder: FormBuilder) {
    this.nutritionistData = {} as Nutritionist;
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
      cnpNumber: [''],
      datetime: ['']
    });
    this.getAllNutritionists();
  }

  getAllNutritionists() {
    this.nutritionistService.getAll().subscribe( (response: any) => {
      this.dataSource.data = response;
    });
  }

  clickAddNutritionist() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  createNutritionistDetails() {
    this.nutritionistModelObj.username = this.formValue.value.username;
    this.nutritionistModelObj.password = this.formValue.value.password;
    this.nutritionistModelObj.firstName = this.formValue.value.firstName;
    this.nutritionistModelObj.lastName = this.formValue.value.lastName;
    this.nutritionistModelObj.email = this.formValue.value.email;
    this.nutritionistModelObj.cnpNumber = this.formValue.value.cnpNumber;
    this.nutritionistModelObj.datetime = this.formValue.value.datetime;

    this.nutritionistService.create(this.nutritionistModelObj).subscribe(response =>{
        console.log(response);
        alert('Nutritionist Added Successfully')
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllNutritionists();
      },
      err=> {
        alert('Something Went Wrong');
      })
  };

  updateNutritionistDetails() {
    this.nutritionistModelObj.username = this.formValue.value.username;
    this.nutritionistModelObj.password = this.formValue.value.password;
    this.nutritionistModelObj.firstName = this.formValue.value.firstName;
    this.nutritionistModelObj.lastName = this.formValue.value.lastName;
    this.nutritionistModelObj.email = this.formValue.value.email;
    this.nutritionistModelObj.cnpNumber = this.formValue.value.cnpNumber;
    this.nutritionistModelObj.datetime = this.formValue.value.datetime;

    this.nutritionistService.update(this.nutritionistModelObj, this.nutritionistModelObj.id)
      .subscribe(response  => {
        alert("Updated Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllNutritionists();
      })
  }

  deleteItem(id: number) {
    this.nutritionistService.delete(id).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.filter((o: Nutritionist) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  cancelEdit() {
    this.isEditMode = false;
    this.nutritionistForm.resetForm();
  }

  onEdit(item: any) {
    this.showAdd = false;
    this.showUpdate = true;

    this.nutritionistModelObj.id = item.id;
    this.formValue.controls['username'].setValue(item.username);
    this.formValue.controls['password'].setValue(item.password);
    this.formValue.controls['firstName'].setValue(item.firstName);
    this.formValue.controls['lastName'].setValue(item.lastName);
    this.formValue.controls['email'].setValue(item.email);
    this.formValue.controls['cnpNumber'].setValue(item.cnpNumber);
    this.formValue.controls['datetime'].setValue(item.datetime);
  }

}
