import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-filter-container">
      <div class="search-box">
        <input 
          type="text" 
          [(ngModel)]="searchQuery" 
          (input)="onSearch()"
          placeholder="Search by area, locality or PG name..."
          class="search-input"
        >
        <button class="search-btn">
          <span class="material-icons">search</span>
        </button>
      </div>
      
      <div class="filters">
        <div class="filter-group">
          <label>Price Range</label>
          <div class="price-inputs">
            <input 
              type="number" 
              [(ngModel)]="filters.minPrice" 
              (change)="onSearch()"
              placeholder="Min ₹" 
              min="0"
            >
            <span>to</span>
            <input 
              type="number" 
              [(ngModel)]="filters.maxPrice" 
              (change)="onSearch()"
              placeholder="Max ₹" 
              min="0"
            >
          </div>
        </div>
        
        <div class="filter-group">
          <label>Gender</label>
          <select [(ngModel)]="filters.gender" (change)="onSearch()">
            <option value="all">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>Area</label>
          <select [(ngModel)]="filters.area" (change)="onSearch()">
            <option value="">All Areas</option>
            <option *ngFor="let area of areas" [value]="area">{{ area }}</option>
          </select>
        </div>
        
        <div class="filter-group amenities-filter">
          <label>Amenities</label>
          <div class="amenities-list">
            <div class="amenity-item" *ngFor="let amenity of availableAmenities">
              <input 
                type="checkbox" 
                [id]="'amenity-' + amenity" 
                [value]="amenity"
                (change)="toggleAmenity(amenity)"
                [checked]="filters.amenities.includes(amenity)"
              >
              <label [for]="'amenity-' + amenity">{{ amenity }}</label>
            </div>
          </div>
        </div>
        
        <button class="btn filter-btn" (click)="onSearch()">Apply Filters</button>
        <button class="btn reset-btn" (click)="resetFilters()">Reset</button>
      </div>
      
      <div class="location-btn-container">
        <button class="btn location-btn" (click)="findNearMe()">
          <span class="material-icons">my_location</span>
          Find PGs Near Me
        </button>
      </div>
    </div>
  `,
  styles: [`
    .search-filter-container {
      background-color: var(--card-color);
      border-radius: 8px;
      box-shadow: var(--shadow);
      padding: 20px;
      margin-bottom: 30px;
    }
    
    .search-box {
      display: flex;
      margin-bottom: 20px;
    }
    
    .search-input {
      flex: 1;
      padding: 12px 15px;
      border: 1px solid var(--border-color);
      border-radius: 4px 0 0 4px;
      font-size: 1rem;
    }
    
    .search-btn {
      background-color: var(--primary-color);
      color: white;
      border: none;
      border-radius: 0 4px 4px 0;
      padding: 0 15px;
      cursor: pointer;
    }
    
    .filters {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 15px;
      margin-bottom: 20px;
    }
    
    .filter-group {
      margin-bottom: 15px;
    }
    
    .filter-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
    }
    
    .filter-group select,
    .filter-group input[type="number"] {
      width: 100%;
      padding: 8px 10px;
      border: 1px solid var(--border-color);
      border-radius: 4px;
    }
    
    .price-inputs {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .price-inputs span {
      color: var(--light-text);
    }
    
    .amenities-filter {
      grid-column: 1 / -1;
    }
    
    .amenities-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 10px;
    }
    
    .amenity-item {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    
    .filter-btn, .reset-btn {
      padding: 10px;
      font-size: 0.9rem;
    }
    
    .reset-btn {
      background-color: #f5f5f5;
      color: var(--text-color);
    }
    
    .location-btn-container {
      display: flex;
      justify-content: center;
    }
    
    .location-btn {
      display: flex;
      align-items: center;
      gap: 5px;
      background-color: var(--secondary-color);
    }
    
    @media (max-width: 768px) {
      .filters {
        grid-template-columns: 1fr 1fr;
      }
      
      .amenities-list {
        grid-template-columns: 1fr 1fr;
      }
    }
    
    @media (max-width: 576px) {
      .filters {
        grid-template-columns: 1fr;
      }
      
      .price-inputs {
        flex-direction: column;
        align-items: flex-start;
      }
      
      .price-inputs input {
        width: 100%;
      }
    }
  `]
})
export class SearchFilterComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<any>();
  @Output() nearMeEvent = new EventEmitter<void>();
  
  searchQuery = '';
  areas: string[] = [];
  
  filters = {
    minPrice: undefined as number | undefined,
    maxPrice: undefined as number | undefined,
    gender: 'all',
    area: '',
    amenities: [] as string[]
  };
  
  availableAmenities = [
    'WiFi', 
    'AC', 
    'Food', 
    'Laundry', 
    'Gym', 
    'Power Backup', 
    'TV Room', 
    'Parking',
    'Security'
  ];
  
  constructor(private locationService: LocationService) {}
  
  ngOnInit() {
    this.locationService.getBangaloreAreas().subscribe(areas => {
      this.areas = areas;
    });
  }
  
  onSearch() {
    // If area is selected, add it to search query
    let effectiveQuery = this.searchQuery;
    if (this.filters.area && !this.searchQuery.includes(this.filters.area)) {
      effectiveQuery = this.filters.area;
    }
    
    this.searchEvent.emit({
      query: effectiveQuery,
      filters: this.filters
    });
  }
  
  toggleAmenity(amenity: string) {
    const index = this.filters.amenities.indexOf(amenity);
    if (index === -1) {
      this.filters.amenities.push(amenity);
    } else {
      this.filters.amenities.splice(index, 1);
    }
    this.onSearch();
  }
  
  resetFilters() {
    this.searchQuery = '';
    this.filters = {
      minPrice: undefined,
      maxPrice: undefined,
      gender: 'all',
      area: '',
      amenities: []
    };
    this.onSearch();
  }
  
  findNearMe() {
    this.nearMeEvent.emit();
  }
}