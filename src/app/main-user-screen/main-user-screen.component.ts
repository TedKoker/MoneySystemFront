import { Component, OnInit } from '@angular/core';
import { MoneyRequest } from 'src/models/addRequest';
import { MoneyService } from 'src/services/moneyService';
import { AuthenticationService } from 'src/services/authontication.service';

@Component({
  selector: 'app-main-user-screen',
  templateUrl: './main-user-screen.component.html',
  styleUrls: ['./main-user-screen.component.scss']
})
export class MainUserScreenComponent implements OnInit {
  moneyArray: MoneyRequest[];
  constructor(private moneyService: MoneyService) { }

  ngOnInit() {
    this.moneyService.getMonth();
    this.moneyArray = this.moneyArray != null ? this.moneyService.getMoneyArray() : null;
    this.moneyService.addedNew.subscribe((data) => {
      this.moneyArray = null;
      this.moneyService.getMonth();
    });
  }
}
