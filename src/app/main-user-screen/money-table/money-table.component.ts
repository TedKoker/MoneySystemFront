import { Component, OnInit } from '@angular/core';
import { MoneyRequest } from 'src/models/addRequest';
import { MoneyService } from 'src/services/moneyService';

@Component({
  selector: 'app-money-table',
  templateUrl: './money-table.component.html',
  styleUrls: ['./money-table.component.scss']
})
export class MoneyTableComponent implements OnInit {
  private moneyArray: MoneyRequest[];
  constructor(private moneyService: MoneyService) { }

  ngOnInit() {
    this.moneyArray = this.moneyService.getMoneyArray();
    console.log(this.moneyArray[0]);
  }

}
