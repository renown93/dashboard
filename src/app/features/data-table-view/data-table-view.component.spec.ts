import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTableViewComponent } from './data-table-view.component';
import { ProductsDataService } from 'src/app/services/product-store.service';
import { of } from 'rxjs';

describe('DataTableViewComponent', () => {
  let component: DataTableViewComponent;
  let fixture: ComponentFixture<DataTableViewComponent>;
  let productsDataServiceMock: any;

  beforeEach(async () => {
    // Create a mock of the ProductsDataService
    productsDataServiceMock = {
      performFetch: jasmine.createSpy('performFetch').and.returnValue(of({})),
      performSort: jasmine.createSpy('performSort'),
      productsData$: of({}),
      getCurrentData: jasmine.createSpy('getCurrentData').and.returnValue({}),
    };

    await TestBed.configureTestingModule({
      declarations: [DataTableViewComponent],
      providers: [
        { provide: ProductsDataService, useValue: productsDataServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call performFetch on fetch event', () => {
    const mockEvent = { page: 2, limit: 5 };
    component.performFetch(mockEvent);
    expect(productsDataServiceMock.performFetch).toHaveBeenCalledWith(
      mockEvent
    );
  });
});
