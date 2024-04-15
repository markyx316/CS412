import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherContainerComponent } from "./weather-container/weather-container.component";
import { WeatherService } from './weather.service';
import { WeatherDisplayComponent } from './weather-display/weather-display.component';
import { WeatherFormComponent } from './weather-form/weather-form.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, WeatherContainerComponent, HttpClientModule, WeatherDisplayComponent, WeatherFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Weather App';
}
