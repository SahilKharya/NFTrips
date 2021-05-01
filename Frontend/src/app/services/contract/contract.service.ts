import { Injectable } from '@angular/core';
import contract from 'truffle-contract';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { error } from 'protractor';

declare let require: any;
const Web3 = require('web3');
const tokenAbi = require('../../../../../build/contracts/Booking.json');
declare let window: any;

@Injectable({
  providedIn: 'root'
})

export class ContractService {
  private readonly web3Provider: null;
  public accountsObservable = new Subject<string[]>();
  public compatible: boolean;
  web3Modal;
  web3js;
  provider;
  accounts;
  balance;
  myContract: any;
  myContractAddress = "0xa6F42Ad12617F6fc10758b23aeE5dd5Cc215e3c7";
  account: any;
  constructor(private snackbar: MatSnackBar) {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: "INFURA" // required
        }
      }
    };

    this.web3Modal = new Web3Modal({
      network: "rinkeby", // optional
      cacheProvider: true, // optional
      providerOptions, // required
      theme: {
        background: "rgb(39, 49, 56)",
        main: "rgb(199, 199, 199)",
        secondary: "rgb(136, 136, 136)",
        border: "rgba(195, 195, 195, 0.14)",
        hover: "rgb(16, 26, 32)"
      }
    });

  }


  async connectAccount() {
    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts();
    this.web3js.eth.getAccounts().then(e => this.account = e[0])        //Store the first account fetched in 'this.account' variable
    return this.accounts;
  }

  async accountInfo(accounts) {
    this.balance = await this.web3js.eth.getBalance(accounts[0]);
    return this.balance;
  }

  getMyContract() {
    this.myContract = this.myContract || new this.web3js.eth.Contract(tokenAbi.abi, this.myContractAddress)
    return this.myContract;
  }

  // getHotelbyId() {
  //   // hotelId = document.getElementById('hotelId').value;
  //   console.log("GET")
  //   bookingContract.hotelsList.call(0, function (err, result) {
  //     if (!err) {
  //       console.log(result);
  //       hotelName = result[0]
  //       document.getElementById("card-title").innerHTML = result[0];
  //       document.getElementById("card-text").innerHTML = result[1];
  //       document.getElementById("available").innerHTML = result[3].c[0];
  //       document.getElementById("costprice").innerHTML = result[2].c[0];

  //     }
  //     else
  //       console.log(err.code)
  //   });
  // }

  addHotel(name, city, beds, price) {

    this.getMyContract().methods._addHotel(name, city, beds, price).send({
      from: this.account,
      gas: 300000
    }, function (error, result) {
      if (!error) {
        console.log(result);
        return result;
      }
      else {
        console.log(error.code)
        return error.code
      }
    })
  }

  bookRoom(hotelid) {
    // bookBedID = document.getElementById('bookBedID').value;
    this.getMyContract().methods._bookOneRoom(hotelid).send({
      from: this.account,
      gas: 100000
    }, function (error, result) {
      if (!error)
        console.log(result);
      else
        console.log(error.code)
    })
  }
  // async function(){
  // this.getMyContract().methods.mymethod('param').send(
  //   {
  //     from: this.account,
  //     gas: 300000
  //   },  function (error, transactionHash) {
  //     if (!error){
  //       console.log(transactionHash);
  //       return transactionHash;}
  //     else{
  //       console.log(error.code)
  //       return error;}

  //   }
  // )
  // }


  failure(message: string) {
    const snackbarRef = this.snackbar.open(message);
    snackbarRef.dismiss()
  }

  succes() {
    const snackbarRef = this.snackbar.open('Transaction complete successfully');
    snackbarRef.dismiss()
  }
}
