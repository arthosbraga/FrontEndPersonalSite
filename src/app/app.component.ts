import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { TranslocoService, TranslocoPipe } from '@jsverse/transloco';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, TranslocoPipe, CommonModule],
  template: `
    <nav class="navbar glass-panel">
      <div class="nav-links">
        <a routerLink="/">{{ 'nav.home' | transloco }}</a>
        <a routerLink="/projects">{{ 'nav.projects' | transloco }}</a>
        <a routerLink="/blog">{{ 'nav.blog' | transloco }}</a>
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
      align-items: center;
      padding: 1rem 2rem;
      margin: 1rem;
      position: sticky;
      top: 1rem;
      z-index: 100;
    }
    .nav-links a {
      margin-right: 1.5rem;
      text-decoration: none;
      color: var(--text-primary);
      font-weight: 500;
      font-family: var(--font-heading);
      
      &:hover {
        color: var(--accent-primary);
      }
    }
    .lang-selector select {
      background: var(--bg-tertiary);
      color: var(--text-primary);
      border: 1px solid var(--glass-border);
      padding: 0.4rem;
      border-radius: var(--radius-md);
      font-family: var(--font-body);
      outline: none;
    }
    main {
      padding: 2rem;
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
