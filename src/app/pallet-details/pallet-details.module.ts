import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PalletDetailsRoutingModule } from './pallet-details-routing.module';

import { PalletDetailsComponent } from './pallet-details.component';
import { PalletStockDetailsComponent } from './pallet-stock-details/pallet-stock-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PalletDetailsRoutingModule,
  ],
  declarations: [
    PalletDetailsComponent,
    PalletStockDetailsComponent,]
})
export class PalletDetailsModule {}
