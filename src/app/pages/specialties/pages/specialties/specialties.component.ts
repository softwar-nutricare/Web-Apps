import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {SpecialtiesService} from "../../services/specialties.service";
import {Specialty} from "../../model/specialty";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-specialties',
  templateUrl: './specialties.component.html',
  styleUrls: ['./specialties.component.css']
})
export class SpecialtiesComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  formValue !: FormGroup;
  specialtyModelObj: Specialty = new Specialty();
  displayedColumns: string[] = ['id', 'name', 'institutionName', 'actions'];
  specialtyData: Specialty;
  showAdd!: boolean;
  showUpdate!: boolean;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  @ViewChild('nutritionistForm', {static: false})
  specialtyForm!: NgForm;

  isEditMode = false;

  constructor(private specialtyService: SpecialtiesService, public dialog: MatDialog,
              private formbuilder: FormBuilder) {
    this.specialtyData = {} as Specialty;
    this.dataSource = new MatTableDataSource<any>();
  }

  // Methods
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.formValue = this.formbuilder.group({
      name: [''],
      institutionName: ['']
    });
    this.getAllSpecialties();
  }

  getAllSpecialties() {
    this.specialtyService.getAll().subscribe( (response: any) => {
      this.dataSource.data = response;
    });
  }

  clickAddSpecialty() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  createSpecialtyDetails() {
    this.specialtyModelObj.name = this.formValue.value.name;
    this.specialtyModelObj.institutionName = this.formValue.value.institutionName;

    this.specialtyService.create(this.specialtyModelObj).subscribe(response =>{
        console.log(response);
        alert('Nutritionist Added Successfully')
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllSpecialties();
      },
      err=> {
        alert('Something Went Wrong');
      })
  };

  updateSpecialtyDetails() {
    this.specialtyModelObj.name = this.formValue.value.name;
    this.specialtyModelObj.institutionName = this.formValue.value.institutionName;

    this.specialtyService.update(this.specialtyModelObj, this.specialtyModelObj.id)
      .subscribe(response  => {
        alert("Updated Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllSpecialties();
      })
  }

  deleteItem(id: number) {
    this.specialtyService.delete(id).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.filter((o: Specialty) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  cancelEdit() {
    this.isEditMode = false;
    this.specialtyForm.resetForm();
  }

  onEdit(item: any) {
    this.showAdd = false;
    this.showUpdate = true;

    this.specialtyModelObj.id = item.id;
    this.formValue.controls['name'].setValue(item.name);
    this.formValue.controls['institutionName'].setValue(item.institutionName);
  }

}
