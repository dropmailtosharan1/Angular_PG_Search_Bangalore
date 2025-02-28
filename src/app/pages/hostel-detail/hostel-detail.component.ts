import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Hostel } from '../../models/hostel.model';
import { HostelService } from '../../services/hostel.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MapViewComponent } from '../../components/map-view/map-view.component';

@Component({
  selector: 'app-hostel-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    MapViewComponent
  ],
  template: `
    <div class="hostel-detail-page">
      <app-header></app-header>
      
      <div class="container main-content" *ngIf="hostel">
        <div class="back-link">
          <a routerLink="/">
            <span class="material-icons">arrow_back</span>
            Back to search
          </a>
        </div>
        
        <div class="hostel-header">
          <div>
            <h1>{{ hostel.name }}</h1>
            <p class="hostel-address">{{ hostel.address }}</p>
          </div>
          <div class="hostel-price">
            <span class="price-amount">₹{{ hostel.price }}</span>
            <span class="price-period">/month</span>
          </div>
        </div>
        
        <div class="hostel-gallery">
          <img [src]="hostel.imageUrl" [alt]="hostel.name">
        </div>
        
        <div class="hostel-details-grid">
          <div class="hostel-info">
            <div class="info-section">
              <h2>Description</h2>
              <p>{{ hostel.description }}</p>
            </div>
            
            <div class="info-section">
              <h2>Amenities</h2>
              <div class="amenities-grid">
                <div class="amenity-item" *ngFor="let amenity of hostel.amenities">
                  <span class="material-icons">check_circle</span>
                  <span>{{ amenity }}</span>
                </div>
              </div>
            </div>
            
            <div class="info-section">
              <h2>Details</h2>
              <div class="details-grid">
                <div class="detail-item">
                  <span class="detail-label">Type</span>
                  <span class="detail-value">
                    {{ hostel.gender === 'male' ? 'Men\'s PG' :  hostel.gender === 'female' ? 'Women\'s PG' : 'Unisex PG' }} </span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Rating</span>
                  <span class="detail-value rating">
                    <span class="material-icons">star</span>
                    {{ hostel.rating.toFixed(1) }}
                  </span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Area</span>
                  <span class="detail-value">{{ hostel.area }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="hostel-contact">
            <div class="contact-card">
              <h2>Contact Information</h2>
              <p class="contact-phone">
                <span class="material-icons">phone</span>
                {{ hostel.contact }}
              </p>
              <button class="btn btn-secondary contact-btn">
                <span class="material-icons">message</span>
                Send Inquiry
              </button>
              <button class="btn contact-btn">
                <span class="material-icons">calendar_today</span>
                Schedule Visit
              </button>
            </div>
          </div>
        </div>
        
        <div class="map-section">
          <h2>Location</h2>
          <app-map-view [hostels]="[hostel]"></app-map-view>
        </div>
        
        <div class="similar-hostels" *ngIf="similarHostels.length > 0">
          <h2>Similar PGs in {{ hostel.area }}</h2>
          <div class="similar-hostels-grid">
            <div class="similar-hostel-card" *ngFor="let similar of similarHostels">
              <img [src]="similar.imageUrl" [alt]="similar.name">
              <div class="similar-hostel-content">
                <h3>{{ similar.name }}</h3>
                <p class="similar-hostel-area">{{ similar.area }}</p>
                <div class="similar-hostel-price">
                  <span class="price-amount">₹{{ similar.price }}</span>
                  <span class="price-period">/month</span>
                </div>
                <a [routerLink]="['/hostel', similar.id]" class="btn view-btn">View</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="container" *ngIf="!hostel">
        <div class="loading-state">
          <p>Loading hostel details...</p>
        </div>
      </div>
      
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .main-content {
      padding: 30px 0 50px;
    }
    
    .back-link {
      margin-bottom: 20px;
    }
    
    .back-link a {
      display: flex;
      align-items: center;
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 500;
    }
    
    .back-link .material-icons {
      font-size: 1.2rem;
      margin-right: 5px;
    }
    
    .hostel-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 20px;
    }
    
    .hostel-header h1 {
      font-size: 2rem;
      margin: 0 0 10px;
    }
    
    .hostel-address {
      color: var(--light-text);
      font-size: 1rem;
    }
    
    .hostel-price {
      background-color: var(--primary-color);
      color: white;
      padding: 10px 15px;
      border-radius: 8px;
      text-align: center;
    }
    
    .price-amount {
      font-size: 1.5rem;
      font-weight: 700;
    }
    
    .price-period {
      font-size: 0.9rem;
      opacity: 0.8;
    }
    
    .hostel-gallery {
      margin-bottom: 30px;
      border-radius: 8px;
      overflow: hidden;
      height: 400px;
    }
    
    .hostel-gallery img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .hostel-details-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 30px;
      margin-bottom: 30px;
    }
    
    .info-section {
      margin-bottom: 30px;
    }
    
    .info-section h2 {
      font-size: 1.5rem;
      margin-bottom: 15px;
      position: relative;
    }
    
    .info-section h2:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -5px;
      width: 40px;
      height: 3px;
      background-color: var(--primary-color);
    }
    
    .amenities-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 15px;
    }
    
    .amenity-item {
      display: flex;
      align-items: center;
    }
    
    .amenity-item .material-icons {
      color: #4CAF50;
      margin-right: 8px;
      font-size: 1.2rem;
    }
    
    .details-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 15px;
    }
    
    .detail-item {
      display: flex;
      flex-direction: column;
    }
    
    .detail-label {
      font-size: 0.9rem;
      color: var(--light-text);
      margin-bottom: 5px;
    }
    
    .detail-value {
      font-weight: 500;
    }
    
    .detail-value.rating {
      display: flex;
      align-items: center;
      color: #FFC107;
    }
    
    .detail-value.rating .material-icons {
      font-size: 1.2rem;
      margin-right: 5px;
    }
    
    .hostel-contact {
      align-self: start;
    }
    
    .contact-card {
      background-color: var(--card-color);
      border-radius: 8px;
      box-shadow: var(--shadow);
      padding: 20px;
    }
    
    .contact-card h2 {
      font-size: 1.3rem;
      margin-bottom: 15px;
    }
    
    .contact-phone {
      display: flex;
      align-items: center;
      font-size: 1.1rem;
      margin-bottom: 20px;
    }
    
    .contact-phone .material-icons {
      margin-right: 10px;
      color: var(--primary-color);
    }
    
    .contact-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      margin-bottom: 10px;
      padding: 12px;
    }
    
    .contact-btn .material-icons {
      margin-right: 8px;
    }
    
    .map-section {
      margin-bottom: 40px;
    }
    
    .map-section h2 {
      font-size: 1.5rem;
      margin-bottom: 15px;
    }
    
    .similar-hostels h2 {
      font-size: 1.5rem;
      margin-bottom: 20px;
    }
    
    .similar-hostels-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
    }
    
    .similar-hostel-card {
      background-color: var(--card-color);
      border-radius: 8px;
      box-shadow: var(--shadow);
      overflow: hidden;
      transition: transform 0.3s;
    }
    
    .similar-hostel-card:hover {
      transform: translateY(-5px);
    }
    
    .similar-hostel-card img {
      width: 100%;
      height: 150px;
      object-fit: cover;
    }
    
    .similar-hostel-content {
      padding: 15px;
    }
    
    .similar-hostel-content h3 {
      font-size: 1.1rem;
      margin: 0 0 5px;
    }
    
    .similar-hostel-area {
      color: var(--light-text);
      font-size: 0.9rem;
      margin-bottom: 10px;
    }
    
    .similar-hostel-price {
      margin-bottom: 15px;
    }
    
    .similar-hostel-price .price-amount {
      font-size: 1.2rem;
      color: var(--primary-color);
    }
    
    .view-btn {
      width: 100%;
      text-align: center;
    }
    
    .loading-state {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 300px;
      font-size: 1.2rem;
      color: var(--light-text);
    }
    
    @media (max-width: 992px) {
      .hostel-details-grid {
        grid-template-columns: 1fr;
      }
      
      .hostel-contact {
        order: -1;
        margin-bottom: 30px;
      }
      
      .contact-card {
        max-width: 400px;
      }
    }
    
    @media (max-width: 768px) {
      .hostel-header {
        flex-direction: column;
      }
      
      .hostel-price {
        margin-top: 15px;
        align-self: flex-start;
      }
      
      .hostel-gallery {
        height: 300px;
      }
    }
    
    @media (max-width: 576px) {
      .hostel-header h1 {
        font-size: 1.8rem;
      }
      
      .hostel-gallery {
        height: 250px;
      }
      
      .amenities-grid, .details-grid {
        grid-template-columns: 1fr 1fr;
      }
    }
  `]
})
export class HostelDetailComponent implements OnInit {
  hostel: Hostel | undefined;
  similarHostels: Hostel[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private hostelService: HostelService
  ) {}
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      
      this.hostelService.getHostelById(id).subscribe(hostel => {
        this.hostel = hostel;
        
        if (hostel) {
          // Get similar hostels in the same area
          this.hostelService.searchHostels(hostel.area, {}).subscribe(hostels => {
            this.similarHostels = hostels
              .filter(h => h.id !== hostel.id)
              .slice(0, 3);
          });
        }
      });
    });
  }
}