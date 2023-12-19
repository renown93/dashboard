import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'close-circle',
  templateUrl: './close-circle.component.html',
  styleUrls: ['./close-circle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloseCircleComponent {
  @Input() fill: string;
  @Input() width: string;
  @Input() height: string;

  constructor() {
    this.fill = 'black';
    this.width = '12';
    this.height = '12';
  }
}
