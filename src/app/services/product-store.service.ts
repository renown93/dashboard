import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProductsApiService } from 'src/app/services/products-api.service';
import { TableData } from '../shared/models/table-data.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../shared/models/product.model';
import { sortNumber, sortString } from '../shared/utils/sort';

@Injectable({
  providedIn: 'root',
})
export class ProductsDataService {
  private initialProductsData: TableData<Product> = {
    title: 'Products Table',
    items: [],
    limit: 10,
    currentPage: 1,
    total: 0,
    skip: 0,
    totalPage: 0,
    orderDirection: 'asc',
    orderId: null,
    error: null,
    isLoading: false,
  };

  private productsDataSource = new BehaviorSubject(this.initialProductsData);
  productsData$ = this.productsDataSource.asObservable();

  constructor(private productsApiService: ProductsApiService) {
    this.performFetch({ page: 1, limit: 10 });
  }

  performFetch({ page, limit }: { page: number; limit: number }) {
    const skip = (page - 1) * limit;
    this.productsDataSource.next({ ...this.getCurrentData(), isLoading: true });
    this.productsApiService
      .getProducts(limit, skip)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.productsDataSource.next({
            ...this.getCurrentData(),
            error: err.message,
            isLoading: false,
          });
          return throwError(err);
        }),
        map((res: any) => ({
          ...this.getCurrentData(),
          items: res.products,
          limit: limit,
          total: res.total,
          skip: skip,
          currentPage: page,
          totalPage: isFinite(Math.ceil(res.total / limit))
            ? Math.ceil(res.total / limit)
            : 1,
        }))
      )
      .subscribe((res: TableData<Product>) => {
        this.productsDataSource.next({ ...res, isLoading: false });
      });
  }
  getCurrentData() {
    return this.productsDataSource.value;
  }
  performSort(
    event: { column: string; direction: 'asc' | 'desc' },
    currentData: TableData<Product>
  ) {
    const sortedData: TableData<Product> = {
      ...currentData,
      items: currentData.items.sort((a: any, b: any): any => {
        if (
          typeof a[event.column] === 'string' &&
          typeof b[event.column] === 'string'
        ) {
          return sortString(event.column, event.direction, a, b);
        }
        return sortNumber(event.column, event.direction, a, b);
      }),
      orderDirection: currentData.orderDirection === 'asc' ? 'desc' : 'asc',
      orderId: event.column,
    };
    this.productsDataSource.next(sortedData);
  }
}
