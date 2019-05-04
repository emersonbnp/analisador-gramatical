import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { CheckerComponent } from './checker/checker.component';


const routes: Routes = [
  { path: 'checker', component: CheckerComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
