import { Routes } from '@angular/router';
import { PortfolioPageComponent } from './components/portfolio-page/portfolio-page.component';

export const routes: Routes = [
  { path: '', component: PortfolioPageComponent },
  { path: '**', redirectTo: '' }
];