import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { UserControllerService } from './shared/services/backend/api/api';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public username = "masalinas.gancedo@gmail.com";
  public password = "underground";

  /*public selectedIndex = 0;
  public appPages = [
    {
      title: 'Pallets',
      url: '/pallets',
      icon: 'cart'
    },
  ];*/

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userControllerService: UserControllerService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.login();
  }

  private login() {
    this.userControllerService.userControllerLogin({email: this.username, password: this.password}).subscribe((result: any) => {
      localStorage.setItem('token', result.token);

      console.log(result.token);
    },
    err => {
      console.log(err);
    });
  }
}
