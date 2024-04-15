import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';
import { WeatherFormComponent } from '../weather-form/weather-form.component';
import { WeatherDisplayComponent } from '../weather-display/weather-display.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-weather-container',
  templateUrl: './weather-container.component.html',
  styleUrls: ['./weather-container.component.css'],
  standalone: true,
  imports: [WeatherFormComponent, WeatherDisplayComponent, HttpClientModule],
  providers: [WeatherService]
})
export class WeatherContainerComponent {
  weatherData: any;

  constructor(private weatherService: WeatherService) {}

  fetchWeather(cities: string[]) {
    this.weatherService.getWeather(cities).subscribe(
      data => {
        this.weatherData = data;
      },
      error => {
        console.error('Failed to fetch weather', error);
        this.weatherData = null;
      }
    );
  }
}
