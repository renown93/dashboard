import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { TableData } from 'src/app/shared/models/table-data.model';
import { Observable } from 'rxjs';
import { Product, ProductParams } from '../shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService {
  constructor(private http: HttpClient) {}

  getProducts(limit: number, skip: number): Observable<TableData<Product>> {
    const params: ProductParams = {};
    if (skip) {
      params['skip'] = skip;
    }

    if (limit) {
      params['limit'] = limit;
    }
    
    return this.http.get<TableData<Product>>('https://dummyjson.com/products', {
      params: { limit, skip },
    });
  }
}
