import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideRouter, withInMemoryScrolling, withEnabledBlockingInitialNavigation} from '@angular/router';

import Aura from '@primeng/themes/aura';
import {providePrimeNG} from 'primeng/config';

import {AppComponent} from './app.component';
import {LayoutModule} from './ctx-layout/layout.module';
import {PrimeNGModule} from './prime-ng/prime-ng.module';
import {AppRoutingModule, routes} from './app-routing.module';

const components = [
  AppComponent
];

const foreignModules = [
  BrowserModule,
];

const localModules = [
  AppRoutingModule,
  LayoutModule,
  PrimeNGModule,
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    ...foreignModules,
    ...localModules
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
