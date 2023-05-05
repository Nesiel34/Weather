import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Forecast } from '../model/IForecast.interface';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SelectWeather } from '../model/ISelectForecast.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {


  constructor(private httpClient: HttpClient) { }

  private selectedDay= new BehaviorSubject<string|null>(null);
  private selectedHour= new Subject<number|null>();
  private selectedWeather = new BehaviorSubject<SelectWeather|null>(null);

  public forecast!:Forecast;

  getForecastWeather(){
    return this.httpClient.get<Forecast>( `${environment.baseUrl}GetWeatherForecast`);
  }



  get selectedWeather$():Observable<SelectWeather|null>{
    return this.selectedWeather.asObservable();
  }

  setSelectedWeather(selectForecast:SelectWeather){
    this.selectedWeather.next(selectForecast);
  }

  get selectedHour$():Observable<number|null>{
    return this.selectedHour.asObservable();
  }

  setSelectedHour(hour:number){
    this.selectedHour.next(hour);
  }

  get selectedDay$():Observable<string|null>{
    return this.selectedDay.asObservable();
  }

  setSelectedDay(date:string){
    this.selectedDay.next(date);
  }



}
