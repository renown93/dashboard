import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-view',
  templateUrl: './progress-view.component.html',
  styleUrls: ['./progress-view.component.scss'],
})
export class ProgressViewComponent {
  completeEventSentText: string;
  constructor() {
    this.completeEventSentText = '';
  }

  onComplete() {}
}
