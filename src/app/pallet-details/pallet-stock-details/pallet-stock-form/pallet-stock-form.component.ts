import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { ModalController } from '@ionic/angular';

import { Stock, Product } from '../../../shared/services/backend/model/models';
import { ProductControllerService } from '../../../shared/services/backend/api/api';

@Component({
  selector: 'pallet-stock-form',
  templateUrl: './pallet-stock-form.component.html',
  styleUrls: ['./pallet-stock-form.component.css']
})
export class PalletStockFormComponent {
  @Input() public tittle: string;
  @Input() public set stock(stock: any) {
    this.stockFormGroup.reset(stock);
  }

  public stockFormGroup = this.fb.group({
    productId: ['', Validators.required],
    lot: [''],
    expeditionDate: [''],
    serialNumber: [''],
    quantity: ['', Validators.required]
  });

  public products: Product[] = [];
  public product: Product;

  constructor(private fb: FormBuilder,
              private modalController: ModalController,
              private productControllerService: ProductControllerService) {
     this.getProducts();
  }

  private getProducts() {
    this.productControllerService.productControllerFind().subscribe((products: any) => {
      this.products = products;
    },
    err => {
      console.log(err);
    });
  }

  okModal() {
    this.modalController.dismiss({
      'save': true,
      'stock': this.stockFormGroup.value
    });
  }

  cancelModal() {
    this.modalController.dismiss({
      'save': false
    });
  }
}
