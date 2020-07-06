import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { map } from 'rxjs/operators';

import { ModalController, ActionSheetController } from '@ionic/angular';

import { PalletStockFormComponent } from './pallet-stock-form/pallet-stock-form.component';

import { Pallet, Stock } from '../../shared/services/backend/model/models';
import { PalletStockControllerService } from '../../shared/services/backend/api/api';

@Component({
  selector: 'pallet-stock-details',
  templateUrl: './pallet-stock-details.component.html',
  styleUrls: ['./pallet-stock-details.component.css']
})
export class PalletStockDetailsComponent implements OnInit {
    /*@Input() public set pallet(pallet: any) {
      this.getStocks()
    }*/
    public pallet: Pallet;
    public stocks: Stock[];

    constructor(private router: Router,
                private modalController: ModalController,
                private actionSheetController: ActionSheetController,
                private activatedroute: ActivatedRoute,
                private palletStockControllerService: PalletStockControllerService) {
    }

    ngOnInit() {
      this.pallet = JSON.parse(this.activatedroute.snapshot.paramMap.get("pallet"));

      this.getStocks();

      console.log(this.pallet);
    }

    private getStocks() {
      let filter: any = {filter: JSON.stringify({include: [{relation: "product"}]})};

      this.palletStockControllerService.palletStockControllerFind(this.pallet.id, filter).pipe(map((datum) => datum.map((stock: any) => {
        if (stock.expeditionDate != undefined)
          stock.expeditionDate = new Date(stock.expeditionDate);

        return stock;
      }))).subscribe((stocks: any) => {
        this.stocks = stocks;
      },
      err => {
        console.log(err);
      });
    }

    closeModal() {
      this.modalController.dismiss({
        'dismissed': true
      });
    }

    async onShowActionsMenuSheet() {
      const actionSheet = await this.actionSheetController.create({
        header: 'Actions Menu',
        //cssClass: 'my-custom-class',
        buttons: [{
            text: 'Add Stock',
            icon: 'add-circle',
            handler: () => {
              this.addStock(this.modalController);
            }
          }, {
            text: 'Remove Stock',
            icon: 'remove-circle',
            handler: () => {
              this.removeStock(this.modalController);
            }
          },
          {
            text: 'Cancel',
            icon: 'close',
            role: 'cancel'
          }
        ]
      });

      await actionSheet.present();
    }

    async addStock(modalController) {
      let stock: any = {};

      const modal = await modalController.create({
        component: PalletStockFormComponent,
        componentProps: {
          'tittle': 'Add Stock',
          'stock': stock
        }
      });

      // show modal view
      modal.present();

      // recover modal result
      const { data } = await modal.onWillDismiss();

      if (data.save == true) {
        let stockLine: any = {};

        stockLine.productId = data.stock.productId;
        stockLine.quantity = data.stock.quantity;
        if (data.stock.lot)
          stockLine.lot = data.stock.lot;
        if (data.stock.expeditionDate)
          stockLine.expeditionDate = data.stock.expeditionDate;
        if (data.stock.serialNumber)
          stockLine.serialNumber = data.stock.serialNumber;

        this.palletStockControllerService.palletStockControllerAddStock(this.pallet.id, stockLine).subscribe((stock: Stock) => {
          this.getStocks();
        },
        err => {
          console.log(err);
        });
      }
    }

    async removeStock(modalController) {
      let stock: any = {};

      const modal = await modalController.create({
        component: PalletStockFormComponent,
        componentProps: {
          'tittle': 'Remove Stock',
          'stock': stock
        }
      });

      // show modal view
      modal.present();

      // recover modal result
      const { data } = await modal.onWillDismiss();

      if (data.save == true) {
        let stockLine: any = {};

        stockLine.productId = data.stock.productId;
        stockLine.quantity = data.stock.quantity;
        if (data.stock.lot)
          stockLine.lot = data.stock.lot;
        if (data.stock.expeditionDate)
          stockLine.expeditionDate = data.stock.expeditionDate;
        if (data.stock.serialNumber)
          stockLine.serialNumber = data.stock.serialNumber;

        this.palletStockControllerService.palletStockControllerRemoveStock(this.pallet.id, stockLine).subscribe((stock: Stock) => {
          this.getStocks();
        },
        err => {
          console.log(err);
        });
      }
    }
}
