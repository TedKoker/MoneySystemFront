import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MoneyService } from 'src/services/moneyService';
import { MoneyRequest } from 'src/models/addRequest';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  addForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', []),
    date: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required, Validators.pattern('"^[0-9]*$"')]),
    isIncome: new FormControl('false', [Validators.required])
  });

  constructor(private moneySrvice: MoneyService) { }

  ngOnInit() {
  }

  addNew() {
    const jsonData = new Map<string, string>();
    // tslint:disable-next-line: forin
    for (const control in this.addForm.controls) {
      jsonData.set(control, this.addForm.get(control).value);
    }
    const obj = [...jsonData].reduce((o, [key, value]) => (o[key] = value, o), {});

    const add = obj as MoneyRequest;
    console.log(add);
    this.moneySrvice.addNew(add);
  }

}