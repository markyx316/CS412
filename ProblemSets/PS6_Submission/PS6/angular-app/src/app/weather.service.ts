import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'http://localhost:3000/ps6/weather';

  constructor(private http: HttpClient) {}

  getWeather(cities: string[]) {
    return this.http.post<any>(this.apiUrl, { cities });
  }
}


