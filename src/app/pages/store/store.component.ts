import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
})
export class StoreComponent {
  constructor(private readonly router: Router) {}

  public async goToProduct(id: string): Promise<void> {
    await this.router.navigateByUrl(`/store/product/${id}`);
  }
}
