import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Recipe} from "../../model/recipe";
import {RecipesService} from "../../services/recipes.service";


@Component({
  selector: 'app-dialog-add-recipe',
  templateUrl: './dialog-add-recipe.component.html',
  styleUrls: ['./dialog-add-recipe.component.css']
})
export class DialogAddRecipeComponent implements OnInit {

  formValue !: FormGroup;
  recipeModelObj: Recipe = new Recipe();
  recipesData !: any;
  constructor(private formbuilder: FormBuilder, private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      recipeTitle: [''],
      ingredients: [''],
      preparation: [''],
      calories: [''],
    })
    this.getAllRecipes();
  }
  createRecipeDetails() {
    this.recipeModelObj.recipeTitle = this.formValue.value.username;
    this.recipeModelObj.ingredients = this.formValue.value.password;
    this.recipeModelObj.preparation = this.formValue.value.firstName;
    this.recipeModelObj.calories = this.formValue.value.lastName;

    this.recipesService.create(this.recipeModelObj).subscribe(response =>{
        console.log(response);
        alert('Recipe Added Successfully')
        this.formValue.reset();
        this.getAllRecipes();
      },
      err=> {
        alert('Something Went Wrong');
      })
  };
  getAllRecipes() {
    this.recipesService.getAll()
      .subscribe( response => {
        this.recipesData = response;
      })
  }


}
