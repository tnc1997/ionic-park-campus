import {NgModule, ErrorHandler} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {IonicStorageModule} from '@ionic/storage';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {EntityCreate} from '../pages/entity-create/entity-create';
import {EntityList} from '../pages/entity-list/entity-list';
import {Home} from '../pages/home/home';
import {Map} from '../pages/map/map';
import {Settings} from '../pages/settings/settings';
import {Setup} from '../pages/setup/setup';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {BuildingProvider} from '../providers/buildings';
import {LectureProvider} from '../providers/lectures';
import {ModuleProvider} from '../providers/modules';
import {SettingProvider} from '../providers/settings';

let pages = [
  MyApp,
  EntityCreate,
  EntityList,
  Home,
  Map,
  Settings,
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
    BuildingProvider,
    LectureProvider,
    ModuleProvider,
    SettingProvider,

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
