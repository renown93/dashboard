import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTableViewComponent } from './features/data-table-view/data-table-view.component';
import { ProgressViewComponent } from './features/progress-view/progress-view.component';

const routes: Routes = [
  { path: '', component: DataTableViewComponent },
  { path: 'progress', component: ProgressViewComponent },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
