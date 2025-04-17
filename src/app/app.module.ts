import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideRouter, withInMemoryScrolling, withEnabledBlockingInitialNavigation} from '@angular/router';

import Aura from '@primeng/themes/aura';
import {providePrimeNG} from 'primeng/config';
import {BlockUIModule} from 'ng-block-ui';

import {AppComponent} from './app.component';
import {LayoutModule} from './ctx-layout/layout.module';
import {PrimeNGModule} from './prime-ng/prime-ng.module';
import {AppRoutingModule, routes} from './app-routing.module';
import {AuthModule} from './ctx-auth/auth.module';
import {LibrariesModule} from './libraries/libraries.module';
import {DashboardModule} from './ctx-dashboards/dashboard.module';
import {FaculdadesModule} from './ctx-faculdades/faculdades.module';

const components = [
  AppComponent
];

const foreignModules = [
  BrowserModule,
  FormsModule,
];

const localModules = [
  AppRoutingModule,
  LayoutModule,
  AuthModule,
  PrimeNGModule,
  LibrariesModule,
  DashboardModule,
  FaculdadesModule
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    ...foreignModules,
    ...localModules,
  ],
  providers: [
    provideRouter(routes, withInMemoryScrolling({anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled'}), withEnabledBlockingInitialNavigation()),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    providePrimeNG({theme: {preset: Aura, options: {darkModeSelector: '.app-dark'}}}),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
