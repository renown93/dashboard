import { TestBed } from '@angular/core/testing';
import { ProductsDataService } from './product-store.service';
import { ProductsApiService } from 'src/app/services/products-api.service';
import { of, throwError } from 'rxjs';
import { TableData } from '../shared/models/table-data.model';
import { Product } from '../shared/models/product.model';
import { HttpClientModule } from '@angular/common/http';

describe('ProductsDataService', () => {
  let service: ProductsDataService;
  let productsApiService: jasmine.SpyObj<ProductsApiService>;
  beforeEach(async () => {
    const spy = jasmine.createSpyObj(ProductsApiService, ['getProducts']);
    const mockResponse: TableData<Product> = {
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

    spy.getProducts.and.returnValue(of(mockResponse));

    TestBed.configureTestingModule({
      providers: [
        ProductsDataService,
        { provide: ProductsApiService, useValue: spy },
      ],
      imports: [HttpClientModule],
    });

    service = TestBed.inject(ProductsDataService);
    productsApiService = TestBed.inject(
      ProductsApiService
    ) as jasmine.SpyObj<ProductsApiService>;
  });

  it('should be created', () => {

    expect(service).toBeTruthy();
  });

  it('should fetch products successfully', (done: DoneFn) => {
    const mockResponse: TableData<Product> = {
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
    productsApiService.getProducts.and.returnValue(of(mockResponse));
    service.performFetch({ page: 1, limit: 10 });

    service.productsData$.subscribe((data: TableData<Product>) => {
      expect(data.total).toBe(0);
      expect(data.isLoading).toBeFalsy();
      done();
    });
  });
});
