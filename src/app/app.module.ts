import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideRouter, withInMemoryScrolling, withEnabledBlockingInitialNavigation} from '@angular/router';

import Aura from '@primeng/themes/aura';
import {providePrimeNG} from 'primeng/config';

import {AppComponent} from './app.component';
import {AppRoutingModule, routes} from './app-routing.module';
import {PrimeNGModule} from './prime-ng/prime-ngmodule.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeNGModule,
    AppRoutingModule
  ],
  providers: [
    provideRouter(routes, withInMemoryScrolling({anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled'}), withEnabledBlockingInitialNavigation()),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    providePrimeNG({theme: {preset: Aura, options: {darkModeSelector: '.app-dark'}}})
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
