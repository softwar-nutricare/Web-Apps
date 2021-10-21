import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {RecipesService} from "../../services/recipes.service";
import {Recipe} from "../../model/recipe";
import {NgForm} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DialogAddRecipeComponent} from "../dialog-add-recipe/dialog-add-recipe.component";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'recipeTitle', 'ingredients', 'preparation', 'calories'];
  recipeData: Recipe;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  @ViewChild('nutritionistForm', {static: false})
  recipeForm!: NgForm;

  isEditMode = false;

  constructor(private recipesService: RecipesService, public dialog: MatDialog) {
    this.recipeData = {} as Recipe;
    this.dataSource = new MatTableDataSource<any>();
  }

  // Methods
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllRecipes();
  }

  getAllRecipes() {
    this.recipesService.getAll().subscribe( (response: any) => {
      this.dataSource.data = response;
    });
  }

  cancelEdit() {
    this.isEditMode = false;
    this.recipeForm.resetForm();
  }

  deleteItem(id: number) {
    this.recipesService.delete(id).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.filter((o: Recipe) => {
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
