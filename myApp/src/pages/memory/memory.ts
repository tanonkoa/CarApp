import { Component } from '@angular/core';
import { NavController } from 'ionic-angular/umd';

import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-memory',
  templateUrl: 'Memory.html'
})
export class MemoryPage {

  constructor(public navCtrl: NavController, private nativeStorage: NativeStorage) {

  }

}
