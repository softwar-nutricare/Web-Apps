import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {BillsService} from "../../services/bills.service";
import {Bill} from "../../model/bill";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import * as _ from 'lodash';
import {MatDialog} from "@angular/material/dialog";
import {Nutritionist} from "../../../nutritionists/model/nutritionist";

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  formValue !: FormGroup;
  billModelObj: Bill = new Bill();
  displayedColumnsBill: string[] = ['id', 'clientID', 'billDate', 'amount', 'ruc', 'actions'];
  billData: Bill;
  showAdd!: boolean;
  showUpdate!: boolean;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  @ViewChild('billForm', {static: false})
  billForm!: NgForm;

  isEditMode = false;

  constructor(private billService: BillsService, public dialog:MatDialog,
              private formbuilder: FormBuilder) {
    this.billData = {} as Bill;
    this.dataSource = new MatTableDataSource<any>();
  }

  // Methods
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.formValue = this.formbuilder.group({
      clientID: [''],
      billDate: [''],
      amount: [''],
      ruc: ['']
    });
    this.getAllBills();
  }

  getAllBills(){
    this.billService.getAll().subscribe( (response:any) => {
      this.dataSource.data = response;
    });
  }

  clickAddBill() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  createBillDetails() {
    this.billModelObj.clientID = this.formValue.value.clientID;
    this.billModelObj.billDate = this.formValue.value.billDate;
    this.billModelObj.amount = this.formValue.value.amount;
    this.billModelObj.ruc = this.formValue.value.ruc;

    this.billService.create(this.billModelObj).subscribe(response =>{
        console.log(response);
        alert('Bill Added Successfully')
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllBills();
      },
      err=> {
        alert('Something Went Wrong');
      })
  };

  updateBillDetails() {
    this.billModelObj.clientID = this.formValue.value.clientID;
    this.billModelObj.billDate = this.formValue.value.billDate;
    this.billModelObj.amount = this.formValue.value.amount;
    this.billModelObj.ruc = this.formValue.value.ruc;

    this.billService.update(this.billModelObj, this.billModelObj.id)
      .subscribe(response  => {
        alert("Updated Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllBills();
      })
  }

  deleteItem(id: number) {
    this.billService.delete(id).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.filter((o: Bill) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  cancelEdit(){
    this.isEditMode = false;
    this.billForm.resetForm();
  }

  onEdit(item: any) {
    this.showAdd = false;
    this.showUpdate = true;

    this.billModelObj.id = item.id;
    this.formValue.controls['clientID'].setValue(item.clientID);
    this.formValue.controls['billDate'].setValue(item.billDate);
    this.formValue.controls['amount'].setValue(item.amount);
    this.formValue.controls['ruc'].setValue(item.ruc);
  }

}
