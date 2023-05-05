import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../service/weather.service';
import { SelectWeather } from '../model/ISelectForecast.interface';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  constructor(private weatherService:WeatherService){}

  weather!:SelectWeather|null;

  ngOnInit(): void {

    this.weatherService.selectedWeather$.subscribe(s=>{
      this.weather =s ;
    })
  }

}
