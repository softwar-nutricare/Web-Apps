import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {NutritionistsService} from "../../services/nutritionists.service";
import {Nutritionist} from "../../model/nutritionist";

@Component({
  selector: 'app-nutritionists',
  templateUrl: './nutritionists.component.html',
  styleUrls: ['./nutritionists.component.css']
})
export class NutritionistsComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'username', 'password', 'firstName', 'lastName', 'email', 'cnpNumber', 'datetime'];
  nutritionistData: Nutritionist;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  constructor(private nutritionistService: NutritionistsService) {
    this.nutritionistData = {} as Nutritionist;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllNutritionists();
  }

  getAllNutritionists() {
    this.nutritionistService.getAll().subscribe( (response: any) => {
      this.dataSource.data = response;
    });
  }



}
