import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component'
import { PropertyListItemComponent } from './Components/property-list-item/property-list-item.component'
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component'
import { WelcomePageComponent } from './Components/welcome-page/welcome-page.component'
import { PublishEditPropertyFormComponent } from './Components/publish-edit-property-form/publish-property-form.component'
import { LogInComponent } from './Components/log-in/log-in.component'

const routes: Routes = [
  {
    path:'', redirectTo:'/welcome', pathMatch:'full'
  },
  {
    path:'welcome', component: WelcomePageComponent
  },
  {
    path:'properties', component: HomeComponent
  },
  {
    path:'property',
    children: [
      { path: ':id', component: PropertyListItemComponent },
      { path: ':id/edit', component: PublishEditPropertyFormComponent, data: { edit: true } }
    ]
  },
  {
    path:'publishForm', component: PublishEditPropertyFormComponent, data: { edit: false }
  },
  {
    path:'logIn', component: LogInComponent
  },
  {
    path:'**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
