import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableGridComponent } from './table-grid.component';
import { By } from '@angular/platform-browser';
import { TableData } from 'src/app/shared/models/table-data.model'; // Import TableData type

describe('TableGridComponent', () => {
  let component: TableGridComponent<any>;
  let fixture: ComponentFixture<TableGridComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind input data correctly', () => {
    const testData: TableData<any> = {
      title: 'Test Title',
      items: [],
      limit: 10,
      currentPage: 1,
      total: 100,
      skip: 0,
      totalPage: 10,
      orderDirection: 'asc',
      orderId: null,
      error: null,
    };
    component.data = testData;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.title').textContent).toContain(
      testData.title
    );
  });

  describe('Pagination', () => {
    it('should emit correct values on pagination change', () => {
      spyOn(component.paginationChange, 'emit');
      component.onPageinationChange(new Event('click'), 2, 20);
      expect(component.paginationChange.emit).toHaveBeenCalledWith({
        page: 2,
        limit: 20,
      });
    });
  });

  describe('Sorting', () => {
    it('should not emit sort change for non-sortable column', () => {
      spyOn(component.sortChange, 'emit');
      const column = { property: 'name', sortable: false };
      component.onSortChange(new Event('click'), column);
      expect(component.sortChange.emit).not.toHaveBeenCalled();
    });
  });

  describe('Utility Methods', () => {
    it('should correctly convert string to number', () => {
      expect(component.convertString('10')).toEqual(10);
    });

    it('should validate page number correctly', () => {
      expect(component.isValidPageNumber(5)).toBeTrue();
      expect(component.isValidPageNumber(NaN)).toBeFalse();
    });
  });
});
