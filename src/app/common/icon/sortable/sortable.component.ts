import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'sortable-icon',
  templateUrl: './sortable.component.html',
  styleUrls: ['./sortable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortableComponent {
  @Input() fill: string;
  @Input() width: string;
  @Input() height: string;

  constructor() {
    this.fill = 'black';
    this.width = '12';
    this.height = '12';
  }
}
