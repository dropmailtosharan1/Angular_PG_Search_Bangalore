import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  template: `
    <div class="about-page">
      <app-header></app-header>
      
      <div class="container main-content">
        <h1>About PG Finder</h1>
        
        <div class="about-section">
          <h2>Our Mission</h2>
          <p>
            PG Finder is dedicated to helping students and working professionals find the perfect paying guest accommodation in Bangalore. 
            We understand the challenges of finding a good place to stay in a new city, and our platform aims to make this process 
            simple, transparent, and stress-free.
          </p>
        </div>
        
        <div class="about-section">
          <h2>What We Offer</h2>
          <div class="features-grid">
            <div class="feature-card">
              <span class="material-icons">search</span>
              <h3>Easy Search</h3>
              <p>Find PGs based on location, budget, amenities, and more with our powerful search filters.</p>
            </div>
            <div class="feature-card">
              <span class="material-icons">location_on</span>
              <h3>Location-Based Results</h3>
              <p>Discover PGs near your workplace or college with our location-based search feature.</p>
            </div>
            <div class="feature-card">
              <span class="material-icons">verified</span>
              <h3>Verified Listings</h3>
              <p>All PGs listed on our platform are verified to ensure you get accurate information.</p>
            </div>
            <div class="feature-card">
              <span class="material-icons">compare</span>
              <h3>Easy Comparison</h3>
              <p>Compare different PGs based on price, amenities, and location to make an informed decision.</p>
            </div>
          </div>
        </div>
        
        <div class="about-section">
          <h2>How It Works</h2>
          <div class="steps-container">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>Search</h3>
                <p>Use our search filters to find PGs that match your requirements.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>Compare</h3>
                <p>Compare different options based on price, amenities, and location.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>Contact</h3>
                <p>Contact the PG owner directly through our platform.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h3>Visit</h3>
                <p>Schedule a visit to see the PG in person before making a decision.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="about-section">
          <h2>Contact Us</h2>
          <div class="contact-info">
            <div class="contact-item">
              <span class="material-icons">email</span>
              <p>info&#64;pgfinder.com</p>
            </div>
            <div class="contact-item">
              <span class="material-icons">phone</span>
              <p>+91 9876543210</p>
            </div>
            <div class="contact-item">
              <span class="material-icons">location_on</span>
              <p>123, Brigade Road, Bangalore - 560001</p>
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
      font-size: 2.5rem;
      margin-bottom: 30px;
      text-align: center;
    }
    
    .about-section {
      margin-bottom: 40px;
    }
    
    .about-section h2 {
      font-size: 1.8rem;
      margin-bottom: 20px;
      position: relative;
      padding-bottom: 10px;
    }
    
    .about-section h2:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 50px;
      height: 3px;
      background-color: var(--primary-color);
    }
    
    .about-section p {
      font-size: 1.1rem;
      line-height: 1.6;
      color: var(--text-color);
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    
    .feature-card {
      background-color: var(--card-color);
      border-radius: 8px;
      box-shadow: var(--shadow);
      padding: 25px;
      text-align: center;
      transition: transform 0.3s;
    }
    
    .feature-card:hover {
      transform: translateY(-5px);
    }
    
    .feature-card .material-icons {
      font-size: 2.5rem;
      color: var(--primary-color);
      margin-bottom: 15px;
    }
    
    .feature-card h3 {
      font-size: 1.3rem;
      margin-bottom: 10px;
    }
    
    .feature-card p {
      font-size: 1rem;
      color: var(--light-text);
    }
    
    .steps-container {
      margin-top: 20px;
    }
    
    .step {
      display: flex;
      margin-bottom: 20px;
      align-items: flex-start;
    }
    
    .step-number {
      background-color: var(--primary-color);
      color: white;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      font-weight: 700;
      margin-right: 15px;
      flex-shrink: 0;
    }
    
    .step-content h3 {
      font-size: 1.3rem;
      margin-bottom: 5px;
    }
    
    .step-content p {
      font-size: 1rem;
      color: var(--light-text);
    }
    
    .contact-info {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    
    .contact-item {
      display: flex;
      align-items: center;
      background-color: var(--card-color);
      border-radius: 8px;
      box-shadow: var(--shadow);
      padding: 15px 20px;
    }
    
    .contact-item .material-icons {
      font-size: 1.5rem;
      color: var(--primary-color);
      margin-right: 15px;
    }
    
    .contact-item p {
      font-size: 1rem;
      margin: 0;
    }
    
    @media (max-width: 768px) {
      h1 {
        font-size: 2rem;
      }
      
      .about-section h2 {
        font-size: 1.5rem;
      }
      
      .about-section p {
        font-size: 1rem;
      }
    }
    
    @media (max-width: 576px) {
      .features-grid {
        grid-template-columns: 1fr;
      }
      
      .contact-info {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AboutComponent {}