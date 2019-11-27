import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../Guards/authGuard';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private authGuard: AuthGuard) { }

  ngOnInit() {
  }

}
