import { Component, OnInit } from '@angular/core';

declare let payhere: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor() { }

  payment;

  ngOnInit(): void {
    this.payment = {
      sandbox: true,
      // merchant_id: '121XXXX',       // Replace your Merchant ID
      merchant_id: '1215222',
      return_url: 'http://sample.com/return',
      cancel_url: 'http://sample.com/cancel',
      notify_url: 'http://sample.com/notify',
      order_id: 'ItemNo12345',
      items: 'Door bell wireles',
      amount: '1000.00',
      currency: 'LKR',
      first_name: 'Saman',
      last_name: 'Perera',
      email: 'samanp@gmail.com',
      phone: '0771234567',
      address: 'No.1, Galle Road',
      city: 'Colombo',
      country: 'Sri Lanka',
      delivery_address: 'No. 46, Galle road, Kalutara South',
      delivery_city: 'Kalutara',
      delivery_country: 'Sri Lanka',
      custom_1: '',
      custom_2: ''
    };

    // Called when user completed the payment. It can be a successful payment or failure
    payhere.onCompleted = function onCompleted(orderId) {
      console.log('Payment completed. OrderID:' + orderId);
    };

    // Called when user closes the payment without completing
    payhere.onDismissed = function onDismissed() {
      console.log('Payment dismissed');
    };


    payhere.onError = function onError(error) {
      console.log('Error:'  + error);
    };

  }

  submit(){
    payhere.startPayment(this.payment);
  }

}
