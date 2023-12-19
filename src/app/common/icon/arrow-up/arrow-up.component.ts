import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'arrow-up',
  templateUrl: './arrow-up.component.html',
  styleUrls: ['./arrow-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArrowUpComponent {
  @Input() fill: string;
  @Input() width: string;
  @Input() height: string;

  constructor() {
    this.fill = 'black';
    this.width = '12';
    this.height = '12';
  }
}
