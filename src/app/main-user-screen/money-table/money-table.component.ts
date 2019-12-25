import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MoneyRequest } from 'src/models/addRequest';
import { MoneyService } from 'src/services/moneyService';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from './add/add.component';

@Component({
  selector: 'app-money-table',
  templateUrl: './money-table.component.html',
  styleUrls: ['./money-table.component.scss']
})
export class MoneyTableComponent implements OnInit {
  private moneyArray: MoneyRequest[];

  constructor(private moneyService: MoneyService, public dialog: MatDialog) { }

  ngOnInit() {
    this.moneyArray = this.moneyService.getMoneyArray();
  }

}
