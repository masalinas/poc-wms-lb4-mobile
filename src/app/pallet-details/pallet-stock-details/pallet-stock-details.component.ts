import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { Pallet, Stock } from '../../shared/services/backend/model/models';

@Component({
  selector: 'pallet-stock-details',
  templateUrl: './pallet-stock-details.component.html',
  styleUrls: ['./pallet-stock-details.component.css']
})
export class PalletStockDetailsComponent implements OnInit {
    @Input() pallet: any;

    constructor(private router: Router,
                private modalController: ModalController,
                private activatedroute: ActivatedRoute) {
    }

    ngOnInit() {
      //this.pallet = JSON.parse(this.activatedroute.snapshot.paramMap.get("pallet"));

      //let pallet = this.router.pallet.paramMap.get("pallet");
      console.log(this.pallet);
    }

    closeModal() {
      // using the injected ModalController this page
      // can "dismiss" itself and optionally pass back data
      this.modalController.dismiss({
        'dismissed': true
      });
    }
}
