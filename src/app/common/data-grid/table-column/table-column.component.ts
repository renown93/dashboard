import { Component, Input } from '@angular/core';

@Component({
  selector: 't-column',
  templateUrl: './table-column.component.html',
  styleUrls: ['./table-column.component.scss'],
})
export class TableColumnComponent {
  @Input() name: string = '';
  @Input() property: string = '';
  @Input() sortable: boolean = false;
  constructor() {}
}
