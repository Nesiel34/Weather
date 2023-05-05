import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../service/weather.service';

@Component({
  selector: 'app-hour-slider',
  templateUrl: './hour-slider.component.html',
  styleUrls: ['./hour-slider.component.scss']
})
export class HourSliderComponent implements OnInit {

  constructor(private weatherService:WeatherService){}
  value:number|null =null;

  ngOnInit(): void {

    this.weatherService.selectedDay$.subscribe(s=>{
      this.value = null;
    })
  }

  changeSlider(e:any){
    this.weatherService.setSelectedHour(e.value);

  }

  formatLabel(e:any){
    return e+":00"
  }

}
