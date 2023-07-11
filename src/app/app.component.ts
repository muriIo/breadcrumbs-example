import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BreadcrumbInterface } from './models/interfaces/breadcrumbs.interface';
import { BreadcrumbsService } from './services/breadcrumbs/breadcrumbs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(
    private readonly breadcrumbService: BreadcrumbsService,
    private readonly router: Router
  ) {
    this.breadcrumbs$ = this.breadcrumbService.breadcrumbs.asObservable();
  }

  public breadcrumbs$: Observable<BreadcrumbInterface[]>;

  public async navigateToBreadcrumb(url: string): Promise<void> {
    return void (await this.router.navigate([url]));
  }

  public async navigate(path: string): Promise<void> {
    await this.router.navigateByUrl(`/${path}`);
  }
}
