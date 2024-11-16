import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { APP_BASE_HREF, DatePipe } from '@angular/common';
import { tokenInterceptor } from './core/authentication/interceptors/token.interceptor';
import { tokenRefreshInterceptor } from './core/authentication/interceptors/token-refresh.interceptor';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)
    , provideClientHydration()
    //, provideAnimationsAsync()
    , provideAnimations()
    , importProvidersFrom(HttpClientModule)
    , importProvidersFrom(MatNativeDateModule)
    , provideHttpClient(withFetch(), withInterceptors([ tokenInterceptor, tokenRefreshInterceptor ]))
    //, provideHttpClient(withFetch(), withInterceptors([ tokenInterceptor ]))
    , DatePipe
    , {provide: APP_BASE_HREF, useValue: environment.baseClientPath}
    // , {provide: APP_BASE_HREF, useValue: '/'}
    //, {provide: APP_BASE_HREF, useValue: '/AgentWalletWeb'}
  ]
};
