import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoService, TranslocoPipe } from '@jsverse/transloco';
import { PortfolioService } from '../../services/portfolio.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslocoPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private portfolioService = inject(PortfolioService);
  private translocoService = inject(TranslocoService);

  // Re-fetch portfolio data when language changes
  portfolio = toSignal(
    this.translocoService.langChanges$.pipe(
      switchMap(() => this.portfolioService.getPortfolio())
    )
  );
}
