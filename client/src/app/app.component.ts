import { Component, OnInit } from '@angular/core';
import { WeatherService } from './service/weather.service';
import { SelectWeather } from './model/ISelectForecast.interface';
import { Forecast, Forecastday } from './model/IForecast.interface';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private weatherService:WeatherService){}
  public forecast!:Forecast;
  private dayWeather:Forecastday|undefined;

  ngOnInit(): void {
    this.weatherService.getForecastWeather().subscribe(s=>{
      this.weatherService.forecast = s;
      this.forecast = this.weatherService.forecast;
      this.weatherService.setSelectedDay( this.weatherService.forecast.forecastday[0].date);
    });

    this.weatherService.selectedDay$.pipe(filter(f=>f!=null)).subscribe(day=>{
     this.dayWeather = this.weatherService.forecast.forecastday.find(f=>f.date==day);
      if(this.dayWeather){
        let selectedWeather:SelectWeather = {
          conditon:this.dayWeather.day.condition,
          temp:this.dayWeather.day.avgtemp_c,
          wind:this.dayWeather.day.avgvis_km
        }
        this.weatherService.setSelectedWeather(selectedWeather);
      }
    });
    this.weatherService.selectedHour$.pipe(filter(f=>f!=null)).subscribe(hour=>{
      let selectHour = this.dayWeather?.hour[Number(hour)];
      if(selectHour){
        let selectedWeather:SelectWeather = {
          conditon:selectHour.condition,
          temp:selectHour.temp_c,
          wind:selectHour.wind_kph
        }
        this.weatherService.setSelectedWeather(selectedWeather);
      }
    })
  }

}
