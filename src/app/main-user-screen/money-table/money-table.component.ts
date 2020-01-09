import { Component, OnInit, Output, EventEmitter, AfterViewInit,
  AfterContentInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { MoneyRequest } from 'src/models/addRequest';
import { MoneyService } from 'src/services/moneyService';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from './add/add.component';
import { FormGroup, FormControl, Validators, Validator } from '@angular/forms';
import { error } from 'util';
import { NgbModalConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-money-table',
  templateUrl: './money-table.component.html',
  providers: [NgbModalConfig, NgbModal],
  styleUrls: ['./money-table.component.scss']
})
export class MoneyTableComponent implements OnInit {
  private moneyArray: MoneyRequest[];
  private monthFocused = false;
  private yearFocuse = false;
  private outAnimation: boolean;
  private leftAnimation: boolean;
  private rightAnimation: boolean;
  private lastValueMonth: string;
  private lastValueYear: string;

  /**
   * If modal is opened thorugh the ts file,
   * it should be type TempletRef, or it will not work
   */
  @ViewChild('content', {static: true}) invalidDateModal: TemplateRef<any>;

  private validateDate: Validators = (x: FormGroup) => {
    const validMonth = this.checkMonth(x.get('month').value);
    const validYear = this.checkYear(x.get('year').value);
    if (!validYear && !validMonth) {
      return {
        year: 'invalid year',
        month: 'invalid month'
      };
    }
    if (!validYear) {
      return {
        year: 'invalid year'
      };
    }
    if (!validMonth) {
      return {
        month: 'invalid month'
      };
    }
    if (Number(x.get('year').value) === new Date().getFullYear()) {
      if (Number(x.get('month').value) > new Date().getMonth() + 1) {
        return {
          date: 'you can not put a future date'
        };
      }
    }
    return null;
  }
  // tslint:disable-next-line: member-ordering
  private itamToDelete: MoneyRequest = null;
  // tslint:disable-next-line: member-ordering
  private date = new FormGroup({
    month: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
    year: new FormControl(null, [Validators.required, , Validators.pattern('^[0-9]*$')])
  }, this.validateDate);

  constructor(private moneyService: MoneyService, public dialog: MatDialog,
    config: NgbModalConfig, private modalService: NgbModal) {
      config.backdrop = 'static';
      config.keyboard = false;
   }

  ngOnInit() {
    this.leftAnimation = false;
    this.rightAnimation = false;
    this.moneyArray = this.moneyService.getMoneyArray();
    this.date.get('month').setValue(this.moneyService.month.toString());
    this.date.get('year').setValue(this.moneyService.year.toString());
    this.lastValueMonth = this.date.get('month').value;
    this.lastValueYear = this.date.get('year').value;
  }

  open(content) { // open modal
    this.modalService.open(content,  {backdropClass: 'light-blue-backdrop'});
    /**
     * The second patameter in this.modalService.open,
     * is a class I am bulding in this component's style file
     */
  }

  closeModal() { // close all open modals
    this.modalService.dismissAll();
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

  onSubmit() {
    if (this.date.valid) {
      setTimeout(() => {
        this.moneyService.getMonth(Number(this.lastValueMonth), Number(this.lastValueYear));
      }, 500);
    } else {
      this.date.get('month').setValue(this.lastValueMonth);
      this.date.get('year').setValue(this.lastValueYear);
      this.open(this.invalidDateModal); // this func open the modal
    }
  }

  checkMonth(month: string): boolean {
    if (month == null) {
      return false;
    }
    if (month.length > 2 || month.length < 1) {
      return false;
    }

    if (Number(month) < 1 || Number(month) > 12) {
      return false;
    }
    return true;
  }

  checkYear(year: string): boolean {
    if (year == null) {
      return false;
    }
    if (year.length !== 4) {
      return false;
    }
    if (Number(year) > new Date().getFullYear() || Number(year) < 1900) {
      return false;
    }
    return true;
  }

  focusOnMonth() {
    this.monthFocused = true;
  }

  focusOnYear() {
    this.yearFocuse = true;
  }

  notFocusOnMonth() {
    this.monthFocused = false;
    if (this.date.valid) {
      this.lastValueMonth = this.date.get('month').value;
    }
    setTimeout(() => {
      if (!this.yearFocuse) {
        this.onSubmit();
      }
    }, 2);
  }

  notFocusOnYear() {
    this.leftAnimation = true;
    if (this.date.valid) {
      this.lastValueYear = this.date.get('year').value;
    }
    setTimeout(() => {
      if (!this.monthFocused) {
        this.onSubmit();
      }
    }, 2);
  }

  oneMonthPrev() {
    const month =   Number(this.date.get('month').value);
    const year = Number(this.date.get('year').value);
    if (month > 1) {
      this.date.get('month').setValue((month - 1).toString());
      this.lastValueMonth = this.date.get('month').value;
      this.lastValueYear = this.date.get('year').value;
    } else {
      this.date.get('month').setValue('12');
      this.date.get('year').setValue((year - 1).toString());
      this.lastValueMonth = this.date.get('month').value;
      this.lastValueYear = this.date.get('year').value;
    }
    this.rightAnimation = true;
    this.onSubmit();
  }

  oneMonthNext() {
    const month =   Number(this.date.get('month').value);
    const year = Number(this.date.get('year').value);
    if (month < 12) {
      this.date.get('month').setValue((month + 1).toString());
      this.lastValueMonth = this.date.get('month').value;
      this.lastValueYear = this.date.get('year').value;
    } else {
      this.date.get('month').setValue('1');
      this.date.get('year').setValue((year + 1).toString());
      this.lastValueMonth = this.date.get('month').value;
      this.lastValueYear = this.date.get('year').value;
    }
    this.leftAnimation = true;
    this.onSubmit();
  }

  disableNext(): boolean {
    return Number(this.date.get('year').value) === new Date().getFullYear()
            && Number(this.date.get('month').value) === new Date().getMonth() + 1;
  }

  disablePerv(): boolean {
    return Number(this.date.get('year').value) === 1900
            && Number(this.date.get('month').value) === 1;
  }

}
