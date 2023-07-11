import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { productDetailsRouteResolver } from './store-routes.resolver';
import { StoreComponent } from './store.component';

const routes: Routes = [
  {
    path: '',
    component: StoreComponent,
    data: { breadcrumb: 'Store' },
    children: [
      {
        path: 'product/:productId',
        loadChildren: () =>
          import('./product-details/product-details.module').then(
            (m) => m.ProductDetailsModule
          ),
        resolve: {
          breadcrumb: productDetailsRouteResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreRoutingModule {}
