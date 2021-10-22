import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DietsService} from "../../services/diets.service";
import {Diet} from "../../model/diet";

@Component({
  selector: 'app-diets',
  templateUrl: './diets.component.html',
  styleUrls: ['./diets.component.css']
})
export class DietsComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  formValue !: FormGroup;
  dietModelObj: Diet = new Diet();
  displayedColumns: string[] = ['id', 'name', 'description', 'createdAt', 'actions'];
  dietData: Diet;
  showAdd!: boolean;
  showUpdate!: boolean;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  @ViewChild('nutritionistForm', {static: false})
  dietForm!: NgForm;

  isEditMode = false;

  constructor(private dietService: DietsService, public dialog: MatDialog,
              private formbuilder: FormBuilder) {
    this.dietData = {} as Diet;
    this.dataSource = new MatTableDataSource<any>();
  }

  // Methods
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.formValue = this.formbuilder.group({
      name: [''],
      description: [''],
      createdAt: ['']
    });
    this.getAllDiets();
  }

  getAllDiets() {
    this.dietService.getAll().subscribe( (response: any) => {
      this.dataSource.data = response;
    });
  }

  clickAddDiet() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  createDietDetails() {
    this.dietModelObj.name = this.formValue.value.name;
    this.dietModelObj.description = this.formValue.value.description;
    this.dietModelObj.createdAt = this.formValue.value.createdAt;

    this.dietService.create(this.dietModelObj).subscribe(response =>{
        console.log(response);
        alert('Diet Added Successfully')
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllDiets();
      },
      err=> {
        alert('Something Went Wrong');
      })
  }

  updateDietDetails() {
    this.dietModelObj.name = this.formValue.value.name;
    this.dietModelObj.description = this.formValue.value.description;
    this.dietModelObj.createdAt = this.formValue.value.createdAt;

    this.dietService.update(this.dietModelObj, this.dietModelObj.id)
      .subscribe(response  => {
        alert("Updated Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllDiets();
      })
  }

  onEdit(item: any) {
    this.showAdd = false;
    this.showUpdate = true;

    this.dietModelObj.id = item.id;
    this.formValue.controls['name'].setValue(item.name);
    this.formValue.controls['description'].setValue(item.description);
    this.formValue.controls['createdAt'].setValue(item.createdAt);
  }

  cancelEdit() {
    this.isEditMode = false;
    this.dietForm.resetForm();
  }

  deleteItem(id: number) {
    this.dietService.delete(id).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.filter((o: Diet) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

}
