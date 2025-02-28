import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hostel } from '../../models/hostel.model';
import { HostelService } from '../../services/hostel.service';
import { LocationService } from '../../services/location.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SearchFilterComponent } from '../../components/search-filter/search-filter.component';
import { MapViewComponent } from '../../components/map-view/map-view.component';
import { HostelCardComponent } from '../../components/hostel-card/hostel-card.component';

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    SearchFilterComponent,
    MapViewComponent,
    HostelCardComponent
  ],
  template: `
    <div class="map-page">
      <app-header></app-header>
      
      <div class="container main-content">
        <h1>PG Hostels Map View</h1>
        
        <app-search-filter 
          (searchEvent)="onSearch($event)"
          (nearMeEvent)="findNearMe()"
        ></app-search-filter>
        
        <div class="map-results-container">
          <div class="map-container">
            <app-map-view 
              [hostels]="hostels"
              [userLocation]="userLocation"
            ></app-map-view>
          </div>
          
          <div class="results-list">
            <h2>{{ hostels.length }} PG Hostels Found</h2>
            <div class="results-scroll">
              <app-hostel-card 
                *ngFor="let hostel of hostels" 
                [hostel]="hostel"
                class="map-hostel-card"
              ></app-hostel-card>
              
              <div *ngIf="hostels.length === 0" class="no-results">
                <p>No PG hostels found matching your criteria.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .main-content {
      padding: 30px 0 50px;
    }
    
    h1 {
      font-size: 2rem;
      margin-bottom: 20px;
    }
    
    .map-results-container {
      display: grid;
      grid-template-columns: 1fr 350px;
      gap: 20px;
      margin-top: 30px;
    }
    
    .results-list {
      background-color: var(--card-color);
      border-radius: 8px;
      box-shadow: var(--shadow);
      padding: 15px;
    }
    
    .results-list h2 {
      font-size: 1.2rem;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--border-color);
    }
    
    .results-scroll {
      max-height: 450px;
      overflow-y: auto;
      padding-right: 5px;
    }
    
    .map-hostel-card {
      margin-bottom: 15px;
    }
    
    .no-results {
      padding: 20px;
      text-align: center;
      color: var(--light-text);
    }
    
    @media (max-width: 992px) {
      .map-results-container {
        grid-template-columns: 1fr;
      }
      
      .results-list {
        order: -1;
      }
      
      .results-scroll {
        max-height: 300px;
      }
    }
    
    @media (max-width: 768px) {
      h1 {
        font-size: 1.8rem;
      }
    }
  `]
})
export class MapPageComponent implements OnInit {
  hostels: Hostel[] = [];
  userLocation: { lat: number, lng: number } | null = null;
  
  constructor(
    private hostelService: HostelService,
    private locationService: LocationService
  ) {}
  
  ngOnInit() {
    this.hostelService.getHostels().subscribe(hostels => {
      this.hostels = hostels;
    });
    
    this.locationService.getCurrentLocation().subscribe(coords => {
      this.userLocation = {
        lat: coords.latitude,
        lng: coords.longitude
      };
    });
  }
  
  onSearch(searchData: any) {
    this.hostelService.searchHostels(searchData.query, searchData.filters).subscribe(hostels => {
      this.hostels = hostels;
    });
  }
  
  findNearMe() {
    this.locationService.getCurrentLocation().subscribe(coords => {
      this.userLocation = {
        lat: coords.latitude,
        lng: coords.longitude
      };
      
      this.hostelService.getHostelsByLocation(coords.latitude, coords.longitude).subscribe(hostels => {
        this.hostels = hostels;
      });
    });
  }
}