import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { Pallet } from '../shared/services/backend/model/models';
import { PalletControllerService } from '../shared/services/backend/api/api';

import { PalletStockDetailsComponent } from './pallet-stock-details/pallet-stock-details.component';

@Component({
  selector: 'pallet-details',
  templateUrl: './pallet-details.component.html',
  styleUrls: ['./pallet-details.component.css']
})
export class PalletDetailsComponent {
    public pallets: Pallet[];

    constructor(private router: Router,
                private modalController: ModalController,
                private palletControllerService: PalletControllerService) {
      this.getPallets();
    }

    private getPallets() {
      //let filter: any = {filter: JSON.stringify({include: [{relation: "palletType"}, {relation: "stocks"}]})};
      let filter: any = {filter: JSON.stringify({include: [{relation: "palletType"}, {relation: "stocks", scope: {include: [{relation: "product"}]}}]})};

      this.palletControllerService.palletControllerFind(filter).subscribe((pallets: any) => {
        this.pallets = pallets;

        console.log(pallets);
      },
      err => {
        console.log(err);
      });
    }

    /*public onStockPallet(pallet) {
      console.log(pallet);

      this.router.navigate(['pallets/pallet-stock', {pallet: pallet}]);
    }*/

    async onStockPallet(pallet) {
      const modal = await this.modalController.create({
        component: PalletStockDetailsComponent,
        componentProps: {
          'pallet': pallet
        }
      });

      return await modal.present();
    }
}
