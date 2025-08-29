import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Register Alan button web component (loader)
import { defineCustomElements as alanBtnDefineCustomElements } from '@alan-ai/alan-button/dist/loader';

if (environment.production) {
  enableProdMode();
}

// bind alan web component to window
alanBtnDefineCustomElements(window);

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));