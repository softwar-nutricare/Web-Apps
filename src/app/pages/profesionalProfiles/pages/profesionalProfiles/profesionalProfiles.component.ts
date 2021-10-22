import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ProfesionalProfilesService} from "../../services/profesionalProfiles.service";
import {ProfesionalProfile} from "../../model/profesionalProfile";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-profesionalProfiles',
  templateUrl: './profesionalProfiles.component.html',
  styleUrls: ['./profesionalProfiles.component.css']
})
export class ProfesionalProfilesComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  formValue !: FormGroup;
  profesionalProfileModelObj: ProfesionalProfile = new ProfesionalProfile();
  displayedColumns: string[] = ['id', 'experience', 'nutritionistId', 'actions'];
  profesionalProfileData: ProfesionalProfile;
  showAdd!: boolean;
  showUpdate!: boolean;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  @ViewChild('profesionalProfileForm', {static: false})
  profesionalProfileForm!: NgForm;

  isEditMode = false;

  constructor(private profesionalProfileService: ProfesionalProfilesService, public dialog: MatDialog,
              private formbuilder: FormBuilder) {
    this.profesionalProfileData = {} as ProfesionalProfile;
    this.dataSource = new MatTableDataSource<any>();
  }

  // Methods
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.formValue = this.formbuilder.group({
      experience: [''],
      nutritionistId: []
    });
    this.getAllProfesionalProfiles();
  }

  getAllProfesionalProfiles() {
    this.profesionalProfileService.getAll().subscribe( (response: any) => {
      this.dataSource.data = response;
    });
  }

  clickAddProfesionalProfile() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  createProfesionalProfileDetails() {
    this.profesionalProfileModelObj.experience = this.formValue.value.experience;
    this.profesionalProfileModelObj.nutritionistId = this.formValue.value.nutritionistId;

    this.profesionalProfileService.create(this.profesionalProfileModelObj).subscribe(response =>{
        console.log(response);
        alert('Profesional Profile Added Successfully')
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllProfesionalProfiles();
      },
      err=> {
        alert('Something Went Wrong');
      })
  };

  updateProfesionalProfileDetails() {
    this.profesionalProfileModelObj.experience = this.formValue.value.experience;
    this.profesionalProfileModelObj.nutritionistId = this.formValue.value.nutritionistId;

    this.profesionalProfileService.update(this.profesionalProfileModelObj, this.profesionalProfileModelObj.id)
      .subscribe(response  => {
        alert("Updated Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllProfesionalProfiles();
      })
  }

  deleteItem(id: number) {
    this.profesionalProfileService.delete(id).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.filter((o: ProfesionalProfile) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  cancelEdit() {
    this.isEditMode = false;
    this.profesionalProfileForm.resetForm();
  }

  onEdit(item: any) {
    this.showAdd = false;
    this.showUpdate = true;

    this.profesionalProfileModelObj.id = item.id;
    this.formValue.controls['experience'].setValue(item.experience);
    this.formValue.controls['nutritionistId'].setValue(item.nutritionistId);
  }

}
