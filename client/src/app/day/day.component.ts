import { Component, Input, OnInit } from '@angular/core';
import { Forecastday } from '../model/IForecast.interface';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {

  constructor() { }

  @Input() forecastday!:Forecastday

  ngOnInit(): void {
  }

}
