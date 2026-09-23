import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { App } from './app/app';
import { routes } from './app/routes';
bootstrapApplication(App, { providers: [provideHttpClient(), provideRouter(routes, withComponentInputBinding(), withInMemoryScrolling({scrollPositionRestoration:'enabled'}))] }).catch(console.error);
