import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TableGridComponent } from './common/data-grid/table-grid/table-grid.component';
import { TableColumnComponent } from './common/data-grid/table-column/table-column.component';
import { ProgressComponent } from './common/progress/progress.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataTableViewComponent } from './features/data-table-view/data-table-view.component';
import { ProgressViewComponent } from './features/progress-view/progress-view.component';
import { HeaderComponent } from './theme/header/header.component';
import { SidebarComponent } from './theme/sidebar/sidebar.component';
import { IconModule } from './common/icon/icon.module';

@NgModule({
  declarations: [
    AppComponent,
    TableGridComponent,
    TableColumnComponent,
    ProgressComponent,
    DataTableViewComponent,
    ProgressViewComponent,
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    IconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
