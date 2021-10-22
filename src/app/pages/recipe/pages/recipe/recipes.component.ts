import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {RecipesService} from "../../services/recipes.service";
import {Recipe} from "../../model/recipe";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  formValue !: FormGroup;
  recipeModelObj: Recipe = new Recipe();
  displayedColumns: string[] = ['id', 'recipeTitle', 'ingredients', 'preparation', 'calories', 'actions'];
  recipeData: Recipe;
  showAdd!: boolean;
  showUpdate!: boolean;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  @ViewChild('nutritionistForm', {static: false})
  nutritionistForm!: NgForm;

  isEditMode = false;

  constructor(private recipeService: RecipesService, public dialog: MatDialog,
              private formbuilder: FormBuilder) {
    this.recipeData = {} as Recipe;
    this.dataSource = new MatTableDataSource<any>();
  }

  // Methods
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.formValue = this.formbuilder.group({
      recipeTitle: [''],
      ingredients: [''],
      preparation: [''],
      calories: []
    });
    this.getAllRecipes();
  }

  getAllRecipes() {
    this.recipeService.getAll().subscribe( (response: any) => {
      this.dataSource.data = response;
    });
  }

  clickAddRecipe() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  createRecipeDetails() {
    this.recipeModelObj.recipeTitle = this.formValue.value.recipeTitle;
    this.recipeModelObj.ingredients = this.formValue.value.ingredients;
    this.recipeModelObj.preparation = this.formValue.value.preparation;
    this.recipeModelObj.calories = this.formValue.value.calories;

    this.recipeService.create(this.recipeModelObj).subscribe(response =>{
        console.log(response);
        alert('Recipe Added Successfully')
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllRecipes();
      },
      err=> {
        alert('Something Went Wrong');
      })
  };

  updateRecipeDetails() {
    this.recipeModelObj.recipeTitle = this.formValue.value.recipeTitle;
    this.recipeModelObj.ingredients = this.formValue.value.ingredients;
    this.recipeModelObj.preparation = this.formValue.value.preparation;
    this.recipeModelObj.calories = this.formValue.value.calories;

    this.recipeService.update(this.recipeModelObj, this.recipeModelObj.id)
      .subscribe(response  => {
        alert("Updated Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllRecipes();
      })
  }

  deleteItem(id: number) {
    this.recipeService.delete(id).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.filter((o: Recipe) => {
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

    this.recipeModelObj.id = item.id;
    this.formValue.controls['recipeTitle'].setValue(item.recipeTitle);
    this.formValue.controls['ingredients'].setValue(item.ingredients);
    this.formValue.controls['preparation'].setValue(item.preparation);
    this.formValue.controls['calories'].setValue(item.calories);

  }

}

