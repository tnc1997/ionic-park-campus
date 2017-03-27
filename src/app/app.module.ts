import {NgModule, ErrorHandler} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {IonicStorageModule} from '@ionic/storage';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {Home} from '../pages/home/home';
import {Map} from '../pages/map/map';
import {Setup} from '../pages/setup/setup';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {Buildings} from '../providers/buildings';
import {Lectures} from '../providers/lectures';
import {Modules} from '../providers/modules';

let pages = [
  MyApp,
  Home,
  Map,
  Setup
];

export function declarations() {
  return pages;
}

export function entryComponents() {
  return pages;
}

export function providers() {
  return [
    Buildings,
    Lectures,
    Modules,

    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
}

@NgModule({
  declarations: [
    declarations(),
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDFxcmMg3xetqqBKoTUJU7_Zt7TGrHyK4g'}),
    ReactiveFormsModule
  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    entryComponents(),
  ],
  providers: [
    providers()
  ]
})
export class AppModule {}
