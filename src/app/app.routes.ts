import { Routes } from '@angular/router';
import { PortfolioPageComponent } from './components/portfolio-page/portfolio-page.component';
import { LegalComponent } from './components/legal/legal.component';

export const routes: Routes = [
  { path: '', component: PortfolioPageComponent },
  { path: 'legal', component: LegalComponent },
  { path: '**', redirectTo: '' },
];
