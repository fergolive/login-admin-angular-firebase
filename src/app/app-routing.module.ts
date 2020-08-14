import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/auth/login/login.component';
import { DocumentComponent } from './components/document/document.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'newdoc', component: DocumentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
