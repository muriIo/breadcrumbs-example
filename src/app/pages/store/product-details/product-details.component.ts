import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent {
  constructor(private readonly activatedRoute: ActivatedRoute) {
    this.activatedRouteSubscription = activatedRoute.params.subscribe(
      (params) => {
        this.productId = params['productId'];
      }
    );
  }

  public productId: string | null = null;

  private activatedRouteSubscription: Subscription;
}
