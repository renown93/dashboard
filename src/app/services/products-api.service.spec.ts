import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsApiService } from './products-api.service';
import { TableData } from '../shared/models/table-data.model';
import { Product } from '../shared/models/product.model';

describe('ProductsApiService', () => {
  let service: ProductsApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsApiService]
    });

    service = TestBed.inject(ProductsApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure that there are no outstanding HTTP calls
  });

  it('should fetch products', () => {
    // Mock response data
    const mockProducts: TableData<Product> = {
      title: 'Test Products Table',
      items: [
        {
          brand: 'Brand 1',
          category: 'Category 1',
          description: 'Description 1',
          discountPercentage: 10,
          id: 1,
          images: ['image1.jpg', 'image2.jpg'],
          price: 100,
          rating: 4.5,
          stock: 20,
          thumbnail: 'thumbnail1.jpg',
          title: 'Product 1'
        },
        {
          brand: 'Brand 2',
          category: 'Category 2',
          description: 'Description 2',
          discountPercentage: 15,
          id: 2,
          images: ['image3.jpg', 'image4.jpg'],
          price: 200,
          rating: 4.7,
          stock: 15,
          thumbnail: 'thumbnail2.jpg',
          title: 'Product 2'
        }
      ],
      limit: 10,
      currentPage: 1,
      total: 2,
      skip: 0,
      totalPage: 1,
      orderDirection: 'asc',
      orderId: null,
      error: null,
      isLoading: false
    };

    // Test the getProducts method
    service.getProducts(10, 0).subscribe(data => {
      expect(data.items.length).toBe(2);
      expect(data.items[0].title).toBe('Product 1');
      expect(data.total).toBe(2);
    });

    // Expect the service to make one GET request and respond with mock data
    const req = httpTestingController.expectOne('https://dummyjson.com/products?limit=10&skip=0');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts); // Provide mock data as the response
  });

  // Add more tests as needed
});
