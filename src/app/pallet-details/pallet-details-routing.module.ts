import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PalletDetailsComponent } from './pallet-details.component';
import { PalletStockDetailsComponent } from './pallet-stock-details/pallet-stock-details.component';

const routes: Routes = [
  {
    path: '',
    component: PalletDetailsComponent
  },
  {
    path: 'pallet-stock',
    component: PalletStockDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PalletDetailsRoutingModule {}
