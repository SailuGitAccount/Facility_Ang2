import 'zone.js'
import 'reflect-metadata'
//import 'core-js/client/shim.min'
//console.log('Reflect', Reflect)
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
platformBrowserDynamic().bootstrapModule(AppModule);
