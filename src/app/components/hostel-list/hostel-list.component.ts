import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hostel } from '../../models/hostel.model';
import { HostelCardComponent } from '../hostel-card/hostel-card.component';

@Component({
  selector: 'app-hostel-list',
  standalone: true,
  imports: [CommonModule, HostelCardComponent],
  template: `
    <div class="hostel-list-container">
      <div *ngIf="hostels.length === 0" class="no-results">
        <span class="material-icons">search_off</span>
        <p>No PG hostels found matching your criteria.</p>
        <p>Try adjusting your filters or search query.</p>
      </div>
      
      <div *ngIf="hostels.length > 0" class="grid hostel-grid">
        <app-hostel-card 
          *ngFor="let hostel of hostels" 
          [hostel]="hostel"
        ></app-hostel-card>
      </div>
    </div>
  `,
  styles: [`
    .hostel-list-container {
      min-height: 300px;
    }
    
    .hostel-grid {
      margin-top: 20px;
    }
    
    .no-results {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 50px 20px;
      text-align: center;
      background-color: var(--card-color);
      border-radius: 8px;
      box-shadow: var(--shadow);
    }
    
    .no-results .material-icons {
      font-size: 3rem;
      color: var(--light-text);
      margin-bottom: 15px;
    }
    
    .no-results p {
      margin: 5px 0;
      color: var(--light-text);
    }
    
    .no-results p:first-of-type {
      font-size: 1.2rem;
      color: var(--text-color);
    }
  `]
})
export class HostelListComponent {
  @Input() hostels: Hostel[] = [];
}