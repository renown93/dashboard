import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 't-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressComponent implements OnInit, OnDestroy {
  destroyed = false;
  @Input() radius: number;
  @Input() progress: number;
  @Input() color: string;
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() complete = new EventEmitter<any>();

  constructor(private cdr: ChangeDetectorRef) {
    this.radius = 50;
    this.progress = 0;
    this.color = '#FA4616';
  }
  rollBackProcess() {
    if (this.destroyed) return;

    const interval = setInterval(() => {
      if (this.progress > 0) {
        this.progress = this.progress - 5;
        this.cdr.markForCheck();
      }
    }, 12);
    setTimeout(() => {
      clearInterval(interval);
      requestAnimationFrame(this.progressLoop.bind(this));
    }, 300);
  }

  progressLoop() {
    if (this.destroyed) return;
    if (this.progress >= 100) {
      this.rollBackProcess.call(this);
      this.complete.emit();
    } else {
      this.progress = this.progress + 2;
      requestAnimationFrame(this.progressLoop.bind(this));
    }
    this.cdr.markForCheck();
  }
  ngOnInit(): void {
    if (this.radius < 50) {
      throw new Error('Radius can not be less then 50');
    }
    if (this.progress > 100) {
      throw new Error('Progress can not be more than 100');
    }
    if (!this.progress) {
      requestAnimationFrame(this.progressLoop.bind(this));
    }
  }
  ngOnDestroy() {
    this.destroyed = true;
  }
}
