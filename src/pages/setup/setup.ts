import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MenuController, NavController, Slides} from 'ionic-angular';
import {Home} from '../home/home';
import {BuildingProvider, LectureProvider, ModuleProvider, SettingProvider} from '../../providers/providers';
import {Building} from '../../models/building';
import {Lecture} from '../../models/lecture';
import {Module} from '../../models/module';
import {Time} from '../../models/time';
import {Setting} from '../../models/setting';

@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html'
})
export class Setup {
  @ViewChild(Slides) slides: Slides;

  createModule: FormGroup;
  createLecture: FormGroup;

  buildings: Building[];
  modules: Module[];

  days = [
    {value: 1, name: "Monday"},
    {value: 2, name: "Tuesday"},
    {value: 3, name: "Wednesday"},
    {value: 4, name: "Thursday"},
    {value: 5, name: "Friday"}
  ];

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public formBuilder: FormBuilder, public buildingProvider: BuildingProvider, public lectureProvider: LectureProvider, public moduleProvider: ModuleProvider, public settingProvider: SettingProvider) {
    menuCtrl.enable(false);

    buildingProvider.queryBuildings().then((values) => {
      this.buildings = <Array<Building>> values;
    });

    moduleProvider.findAll().then((values) => {
      this.modules = <Array<Module>> values;
    });

    this.createLecture = formBuilder.group({
      module: ["", Validators.required],
      lecturer: ["", Validators.required],
      building: ["", Validators.required],
      room: ["", Validators.required],
      day: ["", Validators.required],
      startTime: ["", Validators.required],
      finishTime: ["", Validators.required]
    });
    this.createModule = formBuilder.group({
      code: ["", Validators.required],
      name: ["", Validators.required]
    });
  }

  goToNext() {
    this.slides.slideTo(1);
  }

  goToHome() {
    this.settingProvider.createSetting(new Setting("setup", true));

    this.menuCtrl.enable(true);

    this.navCtrl.setRoot(Home);
  }

  onCreateLecture() {
    let buildingId = this.createLecture.value.building;
    let lecture = new Lecture(null, this.createLecture.value.lecturer, null, this.createLecture.value.room, this.createLecture.value.day, new Time(this.createLecture.value.startTime), new Time(this.createLecture.value.finishTime));

    this.moduleProvider.findByCode(this.createLecture.value.module).then((module: Module) => {
      lecture.module = module;

      return this.buildingProvider.queryBuildings(buildingId);
    }).then((buildings: Building[]) => {
      lecture.building = buildings.pop();

      this.lectureProvider.createLecture(lecture);
    });

    this.createLecture.reset();
  }

  onCreateModule() {
    this.moduleProvider.createModule(new Module(this.createModule.value.code, this.createModule.value.name));

    this.createModule.reset();
  }

  onSlideChanged() {
    if (this.slides.getActiveIndex() == 2) {
      this.moduleProvider.findAll().then((values) => {
        this.modules = <Array<Module>> values;
      });
    }
  }
}
