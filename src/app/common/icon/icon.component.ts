import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'icon-component',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  @Input() iconId: string;
  @Input() fill: string;
  @Input() width: string;
  @Input() height: string;

  constructor() {
    this.iconId = 'asd';
    this.fill = 'black';
    this.width = '12';
    this.height = '12';
  }
}
