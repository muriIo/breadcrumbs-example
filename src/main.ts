//#region Imports

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

//#endregion

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
