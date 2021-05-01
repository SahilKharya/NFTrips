import { Component, OnInit } from '@angular/core';
import { ContractService } from 'src/app/services/contract/contract.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  res: any;

  constructor(private contract: ContractService) { }

  ngOnInit(): void {
  }
  // getHotelInfo() {
  //   // hotelId = document.getElementById('hotelId').value;
  //   console.log("GET")
  //   this.contract.bookRoom(0).then((value: any) => {
  //     console.log(value);
  //     this.res = value;
  //     let hotelName = value[0]
  //     document.getElementById("card-title").innerHTML = this.res[0];
  //     document.getElementById("card-text").innerHTML = this.res[1];
  //     document.getElementById("available").innerHTML = this.res[3].c[0];
  //     document.getElementById("costprice").innerHTML = this.res[2].c[0];

  //   }).catch((error: any) => {
  //     this.contract.failure('Could\'t get the account data, please check if metamask is running correctly and refresh the page');
  //   });

  // }

  // addHotelInfo() {
  //   let name = document.getElementById('name').value;
  //   let city = document.getElementById('city').value;
  //   let beds = document.getElementById('beds').value;
  //   let price = document.getElementById('price').value;

  //   this.contract.addHotel(name, city, beds, price).then((value: any) => {
  //     console.log(value);
  //     this.res = value;
  //   }).catch((error: any) => {
  //     this.contract.failure('Could\'t get the account data, please check if metamask is running correctly and refresh the page');
  //   });
  // }
}
