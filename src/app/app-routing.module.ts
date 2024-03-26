import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TabsComponent } from './tabs/tabs.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/list', pathMatch: 'full'
  },
  {
    path: 'list', component: ListComponent
  },
  {
    path: 'detail', component: TabsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
