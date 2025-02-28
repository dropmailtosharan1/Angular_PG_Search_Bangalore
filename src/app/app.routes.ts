import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HostelDetailComponent } from './pages/hostel-detail/hostel-detail.component';
import { MapPageComponent } from './pages/map-page/map-page.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hostel/:id', component: HostelDetailComponent },
  { path: 'map', component: MapPageComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' }
];