import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {PaymentMethod} from "../../model/paymentMethod";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {PaymentMethodsService} from "../../services/paymentMethods.service";

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.css']
})
export class PaymentMethodsComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  formValue !: FormGroup;
  paymentMethodModelObj: PaymentMethod = new PaymentMethod();
  displayedColumns: string[] = ['id', 'patientId', 'cardNumber', 'cartType', 'expirationDateMonth', 'expirationDateYear', 'securityCode', 'ownerFirstName','ownerLastName','city', 'billingAddress','billingAddressLine2','postalCode','country', 'phoneNumber', 'actions'];
  paymentMethodData: PaymentMethod;
  showAdd!: boolean;
  showUpdate!: boolean;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  @ViewChild('nutritionistForm', {static: false})
  paymentMethodForm!: NgForm;

  isEditMode = false;

  constructor(private paymentMethodService: PaymentMethodsService, public dialog: MatDialog,
              private formbuilder: FormBuilder) {
    this.paymentMethodData = {} as PaymentMethod;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.formValue = this.formbuilder.group({
      patientId: [''],
      cardNumber: [''],
      cartType: [''],
      expirationDateMonth: [''],
      expirationDateYear: [''],
      securityCode: [''],
      ownerFirstName: [''],
      ownerLastName: [''],
      city: [''],
      billingAddress: [''],
      billingAddressLine2: [''],
      postalCode: [''],
      country: [''],
      phoneNumber: ['']
    });
    this.getAllPaymentMethods();
  }

  getAllPaymentMethods() {
    this.paymentMethodService.getAll().subscribe( (response: any) => {
      this.dataSource.data = response;
    });
  }

  clickAddPaymentMethod() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  createPaymentMethodDetails() {
    this.paymentMethodModelObj.patientId = this.formValue.value.patientId;
    this.paymentMethodModelObj.cardNumber = this.formValue.value.cardNumber;
    this.paymentMethodModelObj.cartType = this.formValue.value.cartType;
    this.paymentMethodModelObj.expirationDateMonth = this.formValue.value.expirationDateMonth;
    this.paymentMethodModelObj.expirationDateYear = this.formValue.value.expirationDateYear;
    this.paymentMethodModelObj.securityCode = this.formValue.value.securityCode;
    this.paymentMethodModelObj.ownerFirstName = this.formValue.value.ownerFirstName;
    this.paymentMethodModelObj.ownerLastName = this.formValue.value.ownerLastName;
    this.paymentMethodModelObj.city = this.formValue.value.city;
    this.paymentMethodModelObj.billingAddress = this.formValue.value.billingAddress;
    this.paymentMethodModelObj.billingAddressLine2 = this.formValue.value.billingAddressLine2;
    this.paymentMethodModelObj.postalCode = this.formValue.value.postalCode;
    this.paymentMethodModelObj.country = this.formValue.value.country;
    this.paymentMethodModelObj.phoneNumber = this.formValue.value.phoneNumber;

    this.paymentMethodService.create(this.paymentMethodModelObj).subscribe(response =>{
        console.log(response);
        alert('Payment Method Added Successfully')
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllPaymentMethods();
      },
      err=> {
        alert('Something Went Wrong');
      })
  };

  updatePaymentMethodDetails() {
    this.paymentMethodModelObj.patientId = this.formValue.value.patientId;
    this.paymentMethodModelObj.cardNumber = this.formValue.value.cardNumber;
    this.paymentMethodModelObj.cartType = this.formValue.value.cartType;
    this.paymentMethodModelObj.expirationDateMonth = this.formValue.value.expirationDateMonth;
    this.paymentMethodModelObj.expirationDateYear = this.formValue.value.expirationDateYear;
    this.paymentMethodModelObj.securityCode = this.formValue.value.securityCode;
    this.paymentMethodModelObj.ownerFirstName = this.formValue.value.ownerFirstName;
    this.paymentMethodModelObj.ownerLastName = this.formValue.value.ownerLastName;
    this.paymentMethodModelObj.city = this.formValue.value.city;
    this.paymentMethodModelObj.billingAddress = this.formValue.value.billingAddress;
    this.paymentMethodModelObj.billingAddressLine2 = this.formValue.value.billingAddressLine2;
    this.paymentMethodModelObj.postalCode = this.formValue.value.postalCode;
    this.paymentMethodModelObj.country = this.formValue.value.country;
    this.paymentMethodModelObj.phoneNumber = this.formValue.value.phoneNumber;

    this.paymentMethodService.update(this.paymentMethodModelObj, this.paymentMethodModelObj.id)
      .subscribe(response  => {
        alert("Updated Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllPaymentMethods();
      })
  }

  deleteItem(id: number) {
    this.paymentMethodService.delete(id).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.filter((o: PaymentMethod) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  cancelEdit() {
    this.isEditMode = false;
    this.paymentMethodForm.resetForm();
  }

  onEdit(item: any) {
    this.showAdd = false;
    this.showUpdate = true;

    this.paymentMethodModelObj.id = item.id;
    this.formValue.controls['patientId'].setValue(item.patientId);
    this.formValue.controls['cardNumber'].setValue(item.cardNumber);
    this.formValue.controls['cartType'].setValue(item.cartType);
    this.formValue.controls['expirationDateMonth'].setValue(item.expirationDateMonth);
    this.formValue.controls['expirationDateYear'].setValue(item.expirationDateYear);
    this.formValue.controls['securityCode'].setValue(item.securityCode);
    this.formValue.controls['ownerFirstName'].setValue(item.ownerFirstName);
    this.formValue.controls['ownerLastName'].setValue(item.ownerLastName);
    this.formValue.controls['city'].setValue(item.city);
    this.formValue.controls['billingAddress'].setValue(item.billingAddress);
    this.formValue.controls['billingAddressLine2'].setValue(item.billingAddressLine2);
    this.formValue.controls['postalCode'].setValue(item.postalCode);
    this.formValue.controls['country'].setValue(item.country);
    this.formValue.controls['phoneNumber'].setValue(item.phoneNumber);
  }

}
