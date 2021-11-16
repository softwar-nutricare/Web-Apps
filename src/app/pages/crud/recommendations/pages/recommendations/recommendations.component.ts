import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";

import {Recommendation} from "../../model/recommendation";
import {RecommendationsService} from "../../services/recommendations.service";

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  formValue !: FormGroup;
  recommendationModelObj: Recommendation = new Recommendation();
  displayedColumns: string[] = ['id', 'authorId', 'name', 'description', 'createdAt', 'lastModification', 'actions'];
  recommendationData: Recommendation;
  showAdd!: boolean;
  showUpdate!: boolean;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  @ViewChild('nutritionistForm', {static: false})
  nutritionistForm!: NgForm;

  isEditMode = false;

  constructor(private recommendationService: RecommendationsService, public dialog: MatDialog,
              private formbuilder: FormBuilder) {
    this.recommendationData = {} as Recommendation;
    this.dataSource = new MatTableDataSource<any>();
  }

  // Methods
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.formValue = this.formbuilder.group({
      authorId: [ ],
      name: [''],
      description: [''],
      createdAt: [''],
      lastModification: ['']
    });
    this.getAllRecommendations();
  }

  getAllRecommendations() {
    this.recommendationService.getAll().subscribe( (response: any) => {
      this.dataSource.data = response;
    });
  }

  clickAddRecommendation() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  createRecommendationDetails() {
    this.recommendationModelObj.authorId = this.formValue.value.authorId;
    this.recommendationModelObj.name = this.formValue.value.name;
    this.recommendationModelObj.description = this.formValue.value.description;
    this.recommendationModelObj.createdAt = this.formValue.value.createdAt;
    this.recommendationModelObj.lastModification = this.formValue.value.lastModification;

    this.recommendationService.create(this.recommendationModelObj).subscribe(response =>{
        console.log(response);
        alert('Recommendation Added Successfully')
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllRecommendations();
      },
      err=> {
        alert('Something Went Wrong');
      })
  };

  updateRecommendationDetails() {
    this.recommendationModelObj.authorId = this.formValue.value.authorId;
    this.recommendationModelObj.name = this.formValue.value.name;
    this.recommendationModelObj.description = this.formValue.value.description;
    this.recommendationModelObj.createdAt = this.formValue.value.createdAt;
    this.recommendationModelObj.lastModification = this.formValue.value.lastModification;

    this.recommendationService.update(this.recommendationModelObj, this.recommendationModelObj.id)
      .subscribe(response  => {
        alert("Updated Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllRecommendations();
      })
  }

  deleteItem(id: number) {
    this.recommendationService.delete(id).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.filter((o: Recommendation) => {
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

    this.recommendationModelObj.id = item.id;
    this.formValue.controls['authorId'].setValue(item.authorId);
    this.formValue.controls['name'].setValue(item.name);
    this.formValue.controls['description'].setValue(item.description);
    this.formValue.controls['createdAt'].setValue(item.createdAt);
    this.formValue.controls['lastModification'].setValue(item.lastModification);
  }

}
