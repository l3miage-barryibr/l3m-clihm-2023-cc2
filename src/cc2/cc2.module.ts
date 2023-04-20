import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromoService } from './promo.service';
import { QcmComponent } from './qcm/qcm.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  providers: [
    PromoService
  ],
  imports: [
    CommonModule, FormsModule
  ],
  declarations: [
    QcmComponent
  ],
  exports: [
    QcmComponent
  ]
})
export class Cc2Module { }