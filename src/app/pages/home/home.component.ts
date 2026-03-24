import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  profileTitle = signal('Senior Software Engineer');
  profileDescription = signal('Building high-performance APIs in Rust, scaling databases in Cassandra, and crafting beautiful interfaces with Angular.');
  
  mockArticles = signal([
    { title: 'The Beauty of Rust for Backend Devs', date: 'Mar 15, 2026', readTime: '5 min' },
    { title: 'Scaling Cassandra with .NET vs Rust', date: 'Jan 28, 2026', readTime: '8 min' },
    { title: 'Modern Angular: Signals & Standalone', date: 'Dec 10, 2025', readTime: '6 min' }
  ]);
}
