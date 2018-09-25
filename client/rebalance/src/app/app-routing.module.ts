import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { InputTableComponent } from './input-table/input-table.component';
import { RebalanceTableComponent } from './rebalance-table/rebalance-table.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full'},
  {
    path: 'dashboard/:username',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'dashboard/:username/current', pathMatch: 'full' },
      { path: 'input', component: InputTableComponent },
      { path: 'current', component: TableComponent },
      { path: 'rebalance', component: RebalanceTableComponent },
      { path: ':confirmed', component: TableComponent },
    ]
  },
  { path: 'signin', component: SignInComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
