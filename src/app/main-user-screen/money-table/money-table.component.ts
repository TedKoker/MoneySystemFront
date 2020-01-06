import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MoneyRequest } from 'src/models/addRequest';
import { MoneyService } from 'src/services/moneyService';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from './add/add.component';
import { FormGroup, FormControl, Validators, Validator } from '@angular/forms';
import { error } from 'util';


@Component({
  selector: 'app-money-table',
  templateUrl: './money-table.component.html',
  styleUrls: ['./money-table.component.scss']
})
export class MoneyTableComponent implements OnInit {
  private moneyArray: MoneyRequest[];
  private test: Validators = (x: FormGroup) => {
    const month = x.get('month').value;
    const year = x.get('year').value;
    if (month === '13') {
      return null;
    } else {
      return {
        month: 'do not equel to 13'
      };
    }
  }
  // tslint:disable-next-line: member-ordering
  private itamToDelete: MoneyRequest = null;
  // tslint:disable-next-line: member-ordering
  private date = new FormGroup({
    month: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
    year: new FormControl(null, [Validators.required, , Validators.pattern('^[0-9]*$')])
  }, this.test);
  

  constructor(private moneyService: MoneyService, public dialog: MatDialog) { }

  ngOnInit() {
    this.moneyArray = this.moneyService.getMoneyArray();
  }

  putItamToDelete(itamToPut: MoneyRequest) {
    this.itamToDelete = itamToPut;
  }

  releaseItam() {
    this.itamToDelete = null;
  }

  deleteLine() {
    this.moneyService.deleteLine(this.itamToDelete);
  }

  onSubmit(){
    console.log(this.date);
  }
}
