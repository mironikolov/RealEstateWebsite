import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PropertyListComponent } from './Components/property-list/property-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './Modules/material/material.module';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HomeComponent } from './Components/home/home.component';
import { PropertyListItemComponent, PropertyListItemDialogComponent } from './Components/property-list-item/property-list-item.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { FooterComponent } from './Components/footer/footer.component';
import { WelcomePageComponent } from './Components/welcome-page/welcome-page.component';
import { PublishEditPropertyFormComponent } from './Components/publish-edit-property-form/publish-property-form.component';
import { HomeBannerComponent } from './Components/home-banner/home-banner.component';
import { LogInComponent } from './Components/log-in/log-in.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../environments/environment';
import { LogInModalComponent } from './Components/log-in-modal/log-in-modal.component';
import { SignInModalComponent } from './Components/sign-in-modal/sign-in-modal.component'

@NgModule({
  declarations: [
    AppComponent,
    PropertyListComponent,
    NavbarComponent,
    HomeComponent,
    PropertyListItemComponent,
    PageNotFoundComponent,
    FooterComponent,
    WelcomePageComponent,
    PublishEditPropertyFormComponent,
    HomeBannerComponent,
    LogInComponent,
    LogInModalComponent,
    SignInModalComponent,
    PropertyListItemDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.apiKey
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    LogInModalComponent,
    SignInModalComponent,
    PropertyListItemDialogComponent
  ]
})
export class AppModule { }
