import { ApplicationConfig, provideZoneChangeDetection, isDevMode, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';

export const i18nInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const transloco = inject(TranslocoService);
  const lang = transloco.getActiveLang();
  
  const authReq = req.clone({
    headers: req.headers.set('Accept-Language', lang)
  });
  
  return next(authReq);
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([i18nInterceptor])),
    provideTransloco({
      config: {
        availableLangs: ['en', 'pt', 'es'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader
    })
  ]
};
