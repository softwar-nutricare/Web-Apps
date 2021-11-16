export class PaymentMethod{

  id: number = 0;
  patientId: number = 0;
  cardNumber: number = 0;
  cartType:string = '';
  expirationDateMonth:number = 0;
  expirationDateYear:number = 0;
  securityCode:number = 0;
  ownerFirstName:string = '';
  ownerLastName:string = '';
  city:string = '';
  billingAddress:string = '';
  billingAddressLine2:string = '';
  postalCode:string = '';
  country:string='';
  phoneNumber:number = 0;
}
