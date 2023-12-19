import { Component, OnInit } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableData } from 'src/app/shared/models/table-data.model';
import { TableGridComponent } from './table-grid/table-grid.component';
import { TableColumnComponent } from './table-column/table-column.component';
import { BehaviorSubject } from 'rxjs';
import { FormsModule } from '@angular/forms';

const testItems = new Array(10).fill('').map(() => ({
  id: '1',
  first_name: 'John',
  last_name: 'Doe',
}));

const defaultTableData = {
  title: 'Test Table',
  items: testItems,
  limit: 10,
  currentPage: 1,
  total: 100,
  skip: 0,
  totalPage: 2,
  orderDirection: 'asc' as 'asc' | 'desc',
  orderId: null,
  error: null,
};
const testSubject$ = new BehaviorSubject<TableData<any>>(defaultTableData);

@Component({
  template: ` <t-grid
    [data]="testData"
    [sortable]="true"
    (paginationChange)="performFetch($event)"
    (sortChange)="performSort($event)"
  >
    <t-column [name]="'ID'" [property]="'id'" [sortable]="true"></t-column>
    <t-column
      [name]="'First Name'"
      [property]="'first_name'"
      [sortable]="false"
    ></t-column>
    <t-column
      [name]="'Last Name'"
      [property]="'last_name'"
      [sortable]="true"
    ></t-column>
  </t-grid>`,
})
class TestHostComponent implements OnInit {
  _subscription: any;
  testData: TableData<any> = testSubject$.value;
  performFetch(event: any) {}
  performSort(event: any) {}
  ngOnInit(): void {
    this._subscription = testSubject$.subscribe((res) => {
      this.testData = res;
    });
  }
}

beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [TableGridComponent, TestHostComponent, TableColumnComponent],
    imports: [FormsModule],
  }).compileComponents();
});

describe('Data Grid', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testSubject$.next(defaultTableData);

    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(hostComponent).toBeTruthy();
  });

  describe('Table Data', () => {
    it('should display the items', () => {
      const rows = fixture.nativeElement.querySelectorAll('tbody tr');
      const firstRow = [...rows[0].querySelectorAll('td')].map(
        (i: HTMLElement) => i.innerText
      );

      expect(rows.length).toEqual(testSubject$.value.items.length);

      expect(firstRow).toEqual(['1', 'John', 'Doe']);
    });

    it('should display the table headers correctly', () => {
      const tableHeaders = [
        ...fixture.nativeElement.querySelectorAll('thead th'),
      ].map((el: HTMLElement) => el.innerText);

      const expectedTableHeaders = ['ID', 'First Name', 'Last Name'];

      expect(tableHeaders).toEqual(expectedTableHeaders);
    });
  });

  describe('Table Pagination', () => {
    it('should display correct page number', () => {
      const pageNumberText =
        fixture.nativeElement.querySelector('.pagination-data').innerText;
      expect(pageNumberText).toEqual('Showing 1 to 10 of 100');
    });

    it('should disable previous button if the user is currently in the first page', () => {
      const [previusButton] = fixture.nativeElement.querySelectorAll(
        '.pagination-buttons button'
      );
      expect(previusButton.getAttribute('disabled')).toEqual('true');
    });

    it('should disable next button if the user is currently in the last page', () => {
      testSubject$.next({ ...testSubject$.value, currentPage: 2 });
      fixture.detectChanges();

      const [, nextButton] = fixture.nativeElement.querySelectorAll(
        '.pagination-buttons button'
      );
      expect(nextButton.getAttribute('disabled')).toBeTruthy();
    });

    it('should fire paginationChange with correct params on next button click', () => {
      spyOn(hostComponent, 'performFetch');

      const [, nextButton] = fixture.nativeElement.querySelectorAll(
        '.pagination-buttons button'
      );
      nextButton.click();

      fixture.detectChanges();

      const expectedEvent = {
        page: hostComponent.testData.currentPage + 1,
        limit: hostComponent.testData.limit,
      };

      expect(hostComponent.performFetch).toHaveBeenCalledWith(expectedEvent);
    });

    it('should fire paginationChange with correct params on previous button click', () => {
      testSubject$.next({ ...testSubject$.value, currentPage: 2 });

      fixture.detectChanges();

      spyOn(hostComponent, 'performFetch');

      const [previousButton] = fixture.nativeElement.querySelectorAll(
        '.pagination-buttons button'
      );
      previousButton.click();

      fixture.detectChanges();

      const expectedEvent = {
        page: hostComponent.testData.currentPage - 1,
        limit: hostComponent.testData.limit,
      };

      expect(hostComponent.performFetch).toHaveBeenCalledWith(expectedEvent);
    });

    it('should fire paginationChange with correct params on page count change', () => {
      spyOn(hostComponent, 'performFetch');
      const pageCountElement =
        fixture.nativeElement.querySelector('.table-head select');

      pageCountElement.value = '20';
      pageCountElement.dispatchEvent(new Event('change'));

      fixture.detectChanges();

      const expectedEvent = {
        page: hostComponent.testData.currentPage,
        limit: 20,
      };

      expect(hostComponent.performFetch).toHaveBeenCalledWith(expectedEvent);

      pageCountElement.value = '10';
      pageCountElement.dispatchEvent(new Event('change'));

      fixture.detectChanges();
    });
  });
  
  describe('Table Sort', () => {
    it('should not sort when a table header doesnt have sortable property', () => {
      spyOn(hostComponent, 'performSort');

      const nonSortableHeader = fixture.nativeElement.querySelector(
        'thead th:not([sortable="true"])'
      );

      nonSortableHeader.click();

      fixture.detectChanges();

      expect(hostComponent.performSort).not.toHaveBeenCalled();
    });

    it('should sort when a table header has sortable property', () => {
      spyOn(hostComponent, 'performSort');

      const sortableHeader = fixture.nativeElement.querySelector(
        'thead th[sortable="true"]'
      );

      sortableHeader.click();

      fixture.detectChanges();

      expect(hostComponent.performSort).toHaveBeenCalled();
    });
  });
});
