import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {NutritionistsService} from "../../services/nutritionists.service";
import {Nutritionist} from "../../model/nutritionist";
import {NgForm} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DialogAddRecipeComponent} from "../../../recipe/pages/dialog-add-recipe/dialog-add-recipe.component";

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


  openDialog() {
    let dialogRef = this.dialog.open(DialogAddRecipeComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
