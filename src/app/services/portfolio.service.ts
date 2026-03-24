import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Project {
  id: string;
  title: string;
  description: string;
  url?: string;
  image_url?: string;
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  company: string;
  date_started: string;
  date_ended?: string;
}

export interface PortfolioResponse {
  skills: string[];
  experiences: Experience[];
  projects: Project[];
}

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/v1';

  getPortfolio(): Observable<PortfolioResponse> {
    return this.http.get<PortfolioResponse>(`${this.apiUrl}/portfolio`);
  }

  getArticles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/articles`);
  }

  subscribeNewsletter(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/newsletter/subscribe`, { email });
  }

  sendTelemetry(event: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/telemetry/events`, event);
  }
}
