import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'arrow-down',
  templateUrl: './arrow-down.component.html',
  styleUrls: ['./arrow-down.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArrowDownComponent {
  @Input() fill: string;
  @Input() width: string;
  @Input() height: string;

  constructor() {
    this.fill = 'black';
    this.width = '12';
    this.height = '12';
  }
}
