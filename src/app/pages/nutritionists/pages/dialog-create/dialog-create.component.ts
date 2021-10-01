import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Nutritionist} from "../../model/nutritionist";
import {NutritionistsService} from "../../services/nutritionists.service";
import {Observable} from "rxjs";
import {catchError, retry} from "rxjs/operators";

@Component({
  selector: 'app-dialog-create',
  templateUrl: './dialog-create.component.html',
  styleUrls: ['./dialog-create.component.css']
})
export class DialogCreateComponent implements OnInit {

  formValue !: FormGroup;
  nutritionistModelObj: Nutritionist = new Nutritionist();
  nutritionistsData !: any;
  constructor(private formbuilder: FormBuilder, private nutritionistsService: NutritionistsService) { }

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
    this.getAllNutritionists();
  }
  createNutritionistDetails() {
    this.nutritionistModelObj.username = this.formValue.value.username;
    this.nutritionistModelObj.password = this.formValue.value.password;
    this.nutritionistModelObj.firstName = this.formValue.value.firstName;
    this.nutritionistModelObj.lastName = this.formValue.value.lastName;
    this.nutritionistModelObj.email = this.formValue.value.email;
    this.nutritionistModelObj.cnpNumber = this.formValue.value.cnpNumber;
    this.nutritionistModelObj.datetime = this.formValue.value.datetime;

    this.nutritionistsService.create(this.nutritionistModelObj).subscribe(response =>{
      console.log(response);
      alert('Nutritionist Added Successfully')
      this.formValue.reset();
      this.getAllNutritionists();
    },
      err=> {
      alert('Something Went Wrong');
    })
  };
  getAllNutritionists() {
    this.nutritionistsService.getAll()
      .subscribe( response => {
        this.nutritionistsData = response;
      })
  }


}
