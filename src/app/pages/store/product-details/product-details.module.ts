import { NgModule } from '@angular/core';
import { ProductDetailsRoutingModule } from './product-details-routing-module';
import { ProductDetailsComponent } from './product-details.component';

@NgModule({
  imports: [ProductDetailsRoutingModule],
  declarations: [ProductDetailsComponent],
})
export class ProductDetailsModule {}
