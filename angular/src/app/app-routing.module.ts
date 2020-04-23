import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component'
import { PropertyListItemComponent } from './Components/property-list-item/property-list-item.component'
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component'
import { WelcomePageComponent } from './Components/welcome-page/welcome-page.component'
import { PublishEditPropertyFormComponent } from './Components/publish-edit-property-form/publish-property-form.component'
import { LogInModalComponent } from './Components/log-in-modal/log-in-modal.component'
import { UserInfoComponent } from './Components/user-info/user-info.component';

const routes: Routes = [
  {
    path:'', redirectTo:'/welcome', pathMatch:'full'
  },
  {
    path:'welcome', component: WelcomePageComponent
  },
  {
    path:'home',
    children: [
      { path: 'buy', component: HomeComponent, data: { component: 'buy' }},
      { path: 'rent', component: HomeComponent, data: { component: 'rent' }}
    ]
  },
  {
    path:'property',
    children: [
      { path: ':id', component: PropertyListItemComponent },
      { path: ':id/edit', component: PublishEditPropertyFormComponent, data: { edit: true } }
    ]
  },
  {
    path:'user/:id', component: UserInfoComponent
  },
  {
    path:'publishForm', component: PublishEditPropertyFormComponent, data: { edit: false }
  },
  {
    path:'logIn', component: LogInModalComponent
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
