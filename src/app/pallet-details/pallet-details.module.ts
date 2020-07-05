import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PalletDetailsRoutingModule } from './pallet-details-routing.module';

import { PalletDetailsComponent } from './pallet-details.component';
import { PalletStockDetailsComponent } from './pallet-stock-details/pallet-stock-details.component';
import { PalletStockFormComponent } from './pallet-stock-details/pallet-stock-form/pallet-stock-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PalletDetailsRoutingModule,
  ],
  declarations: [
    PalletDetailsComponent,
    PalletStockDetailsComponent,
    PalletStockFormComponent
  ]
})
export class PalletDetailsModule {}
