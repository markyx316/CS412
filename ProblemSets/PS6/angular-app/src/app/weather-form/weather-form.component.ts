import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-weather-form',
  templateUrl: './weather-form.component.html',
  styleUrls: ['./weather-form.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, CommonModule, HttpClientModule]
})
export class WeatherFormComponent {
  @Output() search = new EventEmitter<string[]>();
  cityName: string = '';
  submitForm() {
    const cities = this.cityName.split(',').map(city => city.trim()).filter(city => city.length >= 3);
    this.search.emit(cities);
  }
}




