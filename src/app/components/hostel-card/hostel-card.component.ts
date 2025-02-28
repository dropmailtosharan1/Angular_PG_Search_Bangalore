import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Hostel } from '../../models/hostel.model';

@Component({
  selector: 'app-hostel-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="hostel-card card">
      <div class="hostel-image">
        <img [src]="hostel.imageUrl" [alt]="hostel.name">
        <div class="hostel-gender" [ngClass]="hostel.gender">
          {{ hostel.gender === 'male' ? 'Men' : hostel.gender === 'female' ? 'Women' : 'Unisex' }}
        </div>
      </div>
      <div class="hostel-content">
        <div class="hostel-header">
          <h3 class="hostel-name">{{ hostel.name }}</h3>
          <div class="hostel-rating">
            <span class="material-icons">star</span>
            <span>{{ hostel.rating.toFixed(1) }}</span>
          </div>
        </div>
        <p class="hostel-address">{{ hostel.address }}</p>
        <p class="hostel-area">
          <span class="material-icons">location_on</span>
          {{ hostel.area }}
          <span *ngIf="hostel.distance" class="hostel-distance">
            ({{ hostel.distance.toFixed(1) }} km away)
          </span>
        </p>
        <div class="hostel-amenities">
          <span *ngFor="let amenity of displayedAmenities" class="amenity-tag">{{ amenity }}</span>
          <span *ngIf="hostel.amenities.length > 3" class="more-amenities">
            +{{ hostel.amenities.length - 3 }} more
          </span>
        </div>
        <div class="hostel-footer">
          <div class="hostel-price">
            <span class="price-amount">₹{{ hostel.price }}</span>
            <span class="price-period">/month</span>
          </div>
          <a [routerLink]="['/hostel', hostel.id]" class="btn view-btn">View Details</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .hostel-card {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    
    .hostel-image {
      position: relative;
      height: 180px;
      overflow: hidden;
    }
    
    .hostel-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
    }
    
    .hostel-card:hover .hostel-image img {
      transform: scale(1.05);
    }
    
    .hostel-gender {
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: 500;
      text-transform: uppercase;
    }
    
    .hostel-gender.male {
      background-color: #2196F3;
      color: white;
    }
    
    .hostel-gender.female {
      background-color: #E91E63;
      color: white;
    }
    
    .hostel-gender.unisex {
      background-color: #9C27B0;
      color: white;
    }
    
    .hostel-content {
      padding: 15px;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    
    .hostel-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 10px;
    }
    
    .hostel-name {
      font-size: 1.2rem;
      margin: 0;
      color: var(--text-color);
      flex: 1;
    }
    
    .hostel-rating {
      display: flex;
      align-items: center;
      background-color: #4CAF50;
      color: white;
      padding: 3px 6px;
      border-radius: 4px;
      font-weight: 500;
      font-size: 0.9rem;
    }
    
    .hostel-rating .material-icons {
      font-size: 1rem;
      margin-right: 2px;
    }
    
    .hostel-address {
      color: var(--light-text);
      font-size: 0.9rem;
      margin-bottom: 5px;
    }
    
    .hostel-area {
      display: flex;
      align-items: center;
      color: var(--primary-color);
      font-size: 0.9rem;
      margin-bottom: 10px;
    }
    
    .hostel-area .material-icons {
      font-size: 1rem;
      margin-right: 2px;
    }
    
    .hostel-distance {
      margin-left: 5px;
      color: var(--light-text);
    }
    
    .hostel-amenities {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      margin-bottom: 15px;
    }
    
    .amenity-tag {
      background-color: #f0f0f0;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 0.8rem;
      color: var(--text-color);
    }
    
    .more-amenities {
      color: var(--light-text);
      font-size: 0.8rem;
      padding: 3px 0;
    }
    
    .hostel-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
    }
    
    .hostel-price {
      display: flex;
      align-items: baseline;
    }
    
    .price-amount {
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--primary-color);
    }
    
    .price-period {
      font-size: 0.8rem;
      color: var(--light-text);
      margin-left: 2px;
    }
    
    .view-btn {
      padding: 6px 12px;
      font-size: 0.9rem;
    }
    
    @media (max-width: 576px) {
      .hostel-image {
        height: 150px;
      }
      
      .hostel-name {
        font-size: 1.1rem;
      }
    }
  `]
})
export class HostelCardComponent {
  @Input() hostel!: Hostel;
  
  get displayedAmenities(): string[] {
    return this.hostel.amenities.slice(0, 3);
  }
}