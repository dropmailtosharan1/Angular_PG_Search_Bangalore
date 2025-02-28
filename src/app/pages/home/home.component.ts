import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hostel } from '../../models/hostel.model';
import { HostelService } from '../../services/hostel.service';
import { LocationService } from '../../services/location.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SearchFilterComponent } from '../../components/search-filter/search-filter.component';
import { HostelListComponent } from '../../components/hostel-list/hostel-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    SearchFilterComponent,
    HostelListComponent
  ],
  template: `
    <div class="home-page">
      <app-header></app-header>
      
      <div class="hero-section">
        <div class="container">
          <h1>Find Your Perfect PG in Bangalore</h1>
          <p>Search from hundreds of verified PG accommodations across Bangalore</p>
        </div>
      </div>
      
      <div class="container main-content">
        <app-search-filter 
          (searchEvent)="onSearch($event)"
          (nearMeEvent)="findNearMe()"
        ></app-search-filter>
        
        <div class="results-info" *ngIf="hostels.length > 0">
          <h2>{{ hostels.length }} PG Hostels Found</h2>
          <p *ngIf="isLocationBased">Showing results near your location</p>
        </div>
        
        <app-hostel-list [hostels]="hostels"></app-hostel-list>
      </div>
      
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .hero-section {
      background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
                        url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
      background-size: cover;
      background-position: center;
      color: white;
      padding: 80px 0;
      text-align: center;
      margin-bottom: 30px;
    }
    
    .hero-section h1 {
      font-size: 2.5rem;
      margin-bottom: 15px;
      font-weight: 700;
    }
    
    .hero-section p {
      font-size: 1.2rem;
      max-width: 600px;
      margin: 0 auto;
      opacity: 0.9;
    }
    
    .main-content {
      padding: 20px 0 50px;
    }
    
    .results-info {
      margin-bottom: 20px;
    }
    
    .results-info h2 {
      font-size: 1.5rem;
      margin-bottom: 5px;
    }
    
    .results-info p {
      color: var(--light-text);
    }
    
    @media (max-width: 768px) {
      .hero-section {
        padding: 60px 0;
      }
      
      .hero-section h1 {
        font-size: 2rem;
      }
      
      .hero-section p {
        font-size: 1rem;
      }
    }
    
    @media (max-width: 576px) {
      .hero-section {
        padding: 40px 0;
      }
      
      .hero-section h1 {
        font-size: 1.8rem;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  hostels: Hostel[] = [];
  isLocationBased = false;
  
  constructor(
    private hostelService: HostelService,
    private locationService: LocationService
  ) {}
  
  ngOnInit() {
    this.hostelService.getHostels().subscribe(hostels => {
      this.hostels = hostels;
    });
  }
  
  onSearch(searchData: any) {
    this.isLocationBased = false;
    this.hostelService.searchHostels(searchData.query, searchData.filters).subscribe(hostels => {
      this.hostels = hostels;
    });
  }
  
  findNearMe() {
    this.isLocationBased = true;
    this.locationService.getCurrentLocation().subscribe(coords => {
      this.hostelService.getHostelsByLocation(coords.latitude, coords.longitude).subscribe(hostels => {
        this.hostels = hostels;
      });
    });
  }
}