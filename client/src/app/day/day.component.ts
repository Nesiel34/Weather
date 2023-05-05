import { Component, Input, OnInit } from '@angular/core';
import { Forecastday } from '../model/IForecast.interface';
import { WeatherService } from '../service/weather.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {

  constructor(private weatherService:WeatherService){}

  @Input() forecastday!:Forecastday

  selected:boolean = false;
  ngOnInit(): void {
    this.weatherService.selectedDay$.subscribe(s=>{
      this.selected  = this.forecastday.date ==s;
    })
  }

  selectDay(date:string){
    this.weatherService.setSelectedDay(date);
  }

}
