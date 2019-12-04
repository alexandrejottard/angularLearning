import { Category } from './../models/category';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SimulationDataService {

  constructor(
    private http: HttpClient
  ) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('./assets/products.json');
  }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('./assets/categories.json');
  }
}
