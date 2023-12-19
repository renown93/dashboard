import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'hamburger-icon',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HamburgerComponent {
  @Input() fill: string;
  @Input() width: string;
  @Input() height: string;

  constructor() {
    this.fill = 'black';
    this.width = '12';
    this.height = '12';
  }
}
