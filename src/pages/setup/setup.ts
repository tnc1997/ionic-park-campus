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

/**
 * The setup page is the first page that the user views after installing the application. It allows them to create
 * modules and lectures which will add value to their experience throughout the application.
 */
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

  /**
   * The menu controller is disabled for the duration of the setup process and then the buildings and modules arrays
   * are initialised. Finally, the forms are built for the creation of lectures and modules respectively.
   *
   * @param {NavController} navCtrl controls the navigation between pages in the application
   * @param {MenuController} menuCtrl controls the menu system of the application
   * @param {FormBuilder} formBuilder builds forms using form groups and validators
   * @param {BuildingProvider} buildingProvider contains CRUD methods to access building related data
   * @param {LectureProvider} lectureProvider contains CRUD methods to access lecture related data
   * @param {ModuleProvider} moduleProvider contains CRUD methods to access module related data
   * @param {SettingProvider} settingProvider contains CRUD methods to access setting related data
   */
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

  /**
   * Changes the slide to the second page.
   */
  goToNext() {
    this.slides.slideTo(1);
  }

  /**
   * Creates a setting to remember that the setup process has been completed, before enabling the menu and navigating
   * the user to the home page.
   */
  goToHome() {
    this.settingProvider.createSetting(new Setting("setup", true));

    this.menuCtrl.enable(true);

    this.navCtrl.setRoot(Home);
  }

  /**
   * Creates a new lecture with the data provided in the lecture creation form. This involves searching for the module
   * selected and subsequently chaining promises to ensure that no data is lost during the asynchronous operations.
   */
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

  /**
   * Creates a new module with the data provided in the module creation form.
   */
  onCreateModule() {
    this.moduleProvider.createModule(new Module(this.createModule.value.code, this.createModule.value.name));

    this.createModule.reset();
  }

  /**
   * If the user navigates to the lecture slide then update the list of modules available in the select box to reflect
   * any recent changes that may have been made on the module creation slide.
   */
  onSlideChanged() {
    if (this.slides.getActiveIndex() == 2) {
      this.moduleProvider.findAll().then((values) => {
        this.modules = <Array<Module>> values;
      });
    }
  }
}
