import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Forecast } from '../model/IForecast.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {


  constructor(private httpClient: HttpClient) { }

  getForecastWeather(){
    return this.httpClient.get<Forecast>( `${environment.baseUrl}GetWeatherForecast`);
  }
}
