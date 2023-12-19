import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ContentChildren,
  QueryList,
} from '@angular/core';
import { TableColumnComponent } from '../table-column/table-column.component';
import { TableData } from 'src/app/shared/models/table-data.model';

@Component({
  selector: 't-grid',
  templateUrl: './table-grid.component.html',
  styleUrls: ['./table-grid.component.scss'],
})
export class TableGridComponent<T extends { [key: string]: any }> {
  @Input() data: TableData<T> = {
    title: '',
    items: [],
    limit: 0,
    currentPage: 0,
    total: 0,
    skip: 0,
    totalPage: 0,
    orderDirection: 'asc',
    orderId: null,
    error: null,
  };
  @Input() sortable: boolean = false;
  @Output() paginationChange = new EventEmitter<{
    page: number;
    limit: number;
  }>();
  @Output() sortChange = new EventEmitter<any>();

  @ContentChildren(TableColumnComponent)
  columns: QueryList<TableColumnComponent>;

  constructor() {
    this.columns = new QueryList<TableColumnComponent>();
  }

  onSortChange(event: Event, column: any): void {
    if (!this.sortable || !column.sortable) return;
    const direction = this.data.orderDirection === 'asc' ? 'desc' : 'asc';

    this.sortChange.emit({ column: column.property, direction });
  }

  onPageinationChange(event: any, page: number, limit: number) {
    this.paginationChange.emit({ page, limit });
  }

  convertString(val: string): number {
    return parseFloat(val);
  }
  isValidPageNumber(val: number) {
    return isFinite(val);
  }
}
