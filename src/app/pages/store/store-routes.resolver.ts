import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ResolveFn,
} from '@angular/router';

export const productDetailsRouteResolver: ResolveFn<string> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const productId = route.paramMap.get('productId');

  return productId || 'not-found';
};
