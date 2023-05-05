import { Component, OnInit } from '@angular/core';
import { Forecast } from './model/IForecast.interface';
import { WeatherService } from './service/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private weatherService:WeatherService){}


  public forecast!:Forecast;

  ngOnInit(): void {
    this.weatherService.getForecastWeather().subscribe(s=>{
      this.forecast = s;
    });
  }

}
