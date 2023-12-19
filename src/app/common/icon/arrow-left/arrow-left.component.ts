import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'arrow-left',
  templateUrl: './arrow-left.component.html',
  styleUrls: ['./arrow-left.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArrowLeftComponent {
  @Input() fill: string;
  @Input() width: string;
  @Input() height: string;

  constructor() {
    this.fill = 'black';
    this.width = '12';
    this.height = '12';
  }
}
