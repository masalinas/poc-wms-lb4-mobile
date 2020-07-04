import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Pallet } from './shared/services/backend/model/models';
import { UserControllerService, PalletControllerService } from './shared/services/backend/api/api';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Inbox',
      url: '/folder/Inbox',
      icon: 'mail'
    },
    {
      title: 'Outbox',
      url: '/folder/Outbox',
      icon: 'paper-plane'
    },
    {
      title: 'Favorites',
      url: '/folder/Favorites',
      icon: 'heart'
    },
    {
      title: 'Archived',
      url: '/folder/Archived',
      icon: 'archive'
    },
    {
      title: 'Trash',
      url: '/folder/Trash',
      icon: 'trash'
    },
    {
      title: 'Spam',
      url: '/folder/Spam',
      icon: 'warning'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  public pallets: Pallet[];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userControllerService: UserControllerService,
    private palletControllerService: PalletControllerService
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
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }

    this.login();
  }

  private login() {
    this.userControllerService.userControllerLogin({email: 'masalinas.gancedo@gmail.com', password: 'underground'}).subscribe((result: any) => {
      localStorage.setItem('token', result.token);

      this.getPallets();
    },
    err => {
      console.log(err);
    });
  }

  private getPallets() {
    let filter: any = {filter: JSON.stringify({include: [{relation: "palletType"}, {relation: "stocks"}]})};

    this.palletControllerService.palletControllerFind(filter).subscribe((pallets: any) => {
       this.pallets = pallets;

       console.log(pallets);
       //this.loadGrid();
      },
      err => {
        console.log(err);
      });
  }
}
