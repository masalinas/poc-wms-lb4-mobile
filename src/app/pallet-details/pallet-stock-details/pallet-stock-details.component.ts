import { Component, OnInit, Input } from '@angular/core';
import { Router, ParamMap } from '@angular/router';

import { Stock } from '../../shared/services/backend/model/models';

@Component({
  selector: 'pallet-stock-details',
  templateUrl: './pallet-stock-details.component.html',
  styleUrls: ['./pallet-stock-details.component.css']
})
export class PalletStockDetailsComponent implements OnInit {
    public stocks: Stock[];

    constructor(private router: Router) {
    }

    ngOnInit() {
      //let pallet = this.router.pallet.paramMap.get("pallet");
      //console.log(pallet);
    }
}
