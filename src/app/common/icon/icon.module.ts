import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IconComponent } from './icon.component';
import { ArrowLeftComponent } from './arrow-left/arrow-left.component';
import { ArrowRightComponent } from './arrow-right/arrow-right.component';
import { ArrowUpComponent } from './arrow-up/arrow-up.component';
import { ArrowDownComponent } from './arrow-down/arrow-down.component';
import { SortableComponent } from './sortable/sortable.component';
import { HamburgerComponent } from './hamburger/hamburger.component';
import { CloseCircleComponent } from './close-circle/close-circle.component';

@NgModule({
  declarations: [
    ArrowLeftComponent,
    ArrowRightComponent,
    ArrowUpComponent,
    ArrowDownComponent,
    IconComponent,
    SortableComponent,
    HamburgerComponent,
    CloseCircleComponent,
  
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [IconComponent],
  exports: [IconComponent],
})
export class IconModule {}
