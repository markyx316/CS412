import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { WeatherFormComponent } from './app/weather-form/weather-form.component';
import { WeatherDisplayComponent } from './app/weather-display/weather-display.component';
import { WeatherContainerComponent } from './app/weather-container/weather-container.component';
import { WeatherService } from './app/weather.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    WeatherFormComponent,
    WeatherDisplayComponent,
    WeatherContainerComponent,
    WeatherService, provideAnimationsAsync(),
  ]
}).catch((err) => console.error(err));
