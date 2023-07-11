import { Injectable, OnDestroy } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterEvent,
  Event,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BreadcrumbInterface } from '../../models/interfaces/breadcrumbs.interface';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbsService implements OnDestroy {
  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.routerEventsSubscription = router.events
      .pipe(
        filter(
          (e: Event | RouterEvent): e is RouterEvent => e instanceof RouterEvent
        )
      )
      .subscribe(() => this.buildBreadcrumbs());
  }

  public breadcrumbs: BehaviorSubject<BreadcrumbInterface[]> =
    new BehaviorSubject<BreadcrumbInterface[]>([]);

  public routerEventsSubscription: Subscription;

  public ngOnDestroy(): void {
    this.routerEventsSubscription.unsubscribe();
  }

  private buildBreadcrumbs(): void {
    let currentRoute: ActivatedRoute | null = this.activatedRoute.root;
    let url: string = '';
    const breadcrumbsTemp: BreadcrumbInterface[] = [];

    console.log(currentRoute.children);

    do {
      const childrenRoutes: ActivatedRoute[] = this.getRoutesBySpecifcOutlet(
        currentRoute.children,
        'primary'
      );

      currentRoute = null;

      for (let route of childrenRoutes) {
        const routeSnapshot: ActivatedRouteSnapshot = route.snapshot;
        const currentBreadcrumb: string | string[] =
          routeSnapshot.data['breadcrumb'];
        const segment: string[] = routeSnapshot.url.map(
          (segment) => segment.path
        );

        url += segment.length ? segment.join('/') : '/';

        const breadcrumbExists = this.validateBreadcrumb(
          breadcrumbsTemp,
          currentBreadcrumb
        );

        if (!currentBreadcrumb || breadcrumbExists) continue;

        if (Array.isArray(currentBreadcrumb)) {
          currentBreadcrumb.forEach((breadcrumb) => {
            const indexOfBreadcrumb: number = url.indexOf(
              breadcrumb.toLowerCase()
            );
            const breadcrumbUrl: string = url.slice(
              0,
              indexOfBreadcrumb + breadcrumb.length
            );

            breadcrumbsTemp.push({
              label: breadcrumb,
              url: breadcrumbUrl,
            });
          });
        } else {
          breadcrumbsTemp.push({
            label: currentBreadcrumb,
            url,
          });
        }

        currentRoute = route;
      }
    } while (currentRoute);

    this.breadcrumbs.next(breadcrumbsTemp);
  }

  private getRoutesBySpecifcOutlet(
    children: ActivatedRoute[],
    outlet: string
  ): ActivatedRoute[] {
    return children.filter((child) => child.outlet === outlet);
  }

  private validateBreadcrumb(
    breadcrumbsTemp: BreadcrumbInterface[],
    routeBreadcrumbs: string | string[]
  ): boolean {
    const exists = breadcrumbsTemp.find(
      (breadcrumb) => breadcrumb.label === routeBreadcrumbs
    );

    return !!exists;
  }
}
