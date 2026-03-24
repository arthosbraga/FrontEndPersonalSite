import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, TranslocoModule, CommonModule],
  template: `
    <nav class="navbar">
      <div class="nav-links">
        <a routerLink="/" *transloco="let t">{{ t('nav.home') }}</a>
        <a routerLink="/projects" *transloco="let t">{{ t('nav.projects') }}</a>
        <a routerLink="/blog" *transloco="let t">{{ t('nav.blog') }}</a>
      </div>
      <div class="lang-selector">
        <select (change)="changeLang($event)">
          <option value="en" [selected]="activeLang === 'en'">English</option>
          <option value="pt" [selected]="activeLang === 'pt'">Português</option>
          <option value="es" [selected]="activeLang === 'es'">Español</option>
        </select>
      </div>
    </nav>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      padding: 1rem 2rem;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }
    .nav-links a {
      margin-right: 1.5rem;
      text-decoration: none;
      color: inherit;
      font-weight: 500;
    }
    .lang-selector select {
      background: transparent;
      border: 1px solid #ccc;
      padding: 0.2rem;
      border-radius: 4px;
    }
  `]
})
export class AppComponent {
  private translocoService = inject(TranslocoService);

  get activeLang() {
    return this.translocoService.getActiveLang();
  }

  changeLang(event: Event) {
    const lang = (event.target as HTMLSelectElement).value;
    this.translocoService.setActiveLang(lang);
  }
}
