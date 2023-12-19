import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'arrow-right',
  templateUrl: './arrow-right.component.html',
  styleUrls: ['./arrow-right.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArrowRightComponent {
  @Input() fill: string;
  @Input() width: string;
  @Input() height: string;

  constructor() {
    this.fill = 'black';
    this.width = '12';
    this.height = '12';
  }
}
