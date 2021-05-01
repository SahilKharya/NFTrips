import { ContractService } from './../../services/contract/contract.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  res: string;
  balance: string;
  data;

  constructor(private contract: ContractService) {

  }


  connectAccount() {
    console.warn('dio');
    this.contract.connectAccount().then((value: any) => {
      console.log(value);
      this.res = value;
      this.getDetails(this.res);
    }).catch((error: any) => {
      this.contract.failure('Could\'t get the account data, please check if metamask is running correctly and refresh the page');
    });
  }


  getDetails(account){
    this.contract.accountInfo(account).then((value:any) => {
      this.balance = value;
      console.log(value);
    }).catch((error: any) => {
      this.contract.failure('Could\'t get the account data, please check if metamask is running correctly and refresh the page');
    });
  }

}
