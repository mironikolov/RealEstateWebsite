import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component'
import { PropertyListItemComponent } from './Components/property-list-item/property-list-item.component'
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component'
import { WelcomePageComponent } from './Components/welcome-page/welcome-page.component'
import { PublishPropertyFormComponent } from './Components/publish-property-form/publish-property-form.component'
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
    path:'property/:id', component: PropertyListItemComponent
  },
  {
    path:'publishForm', component: PublishPropertyFormComponent
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
