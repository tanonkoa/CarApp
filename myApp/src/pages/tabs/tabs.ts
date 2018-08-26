import { Component } from '@angular/core';


import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { MemoryPage} from '../memory/memory';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MemoryPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
