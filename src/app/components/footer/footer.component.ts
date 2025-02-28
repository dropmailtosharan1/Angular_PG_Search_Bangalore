import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>PG Finder</h3>
            <p>Find the perfect paying guest accommodation in Bangalore with our easy-to-use search platform.</p>
          </div>
          <div class="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Search</a></li>
              <li><a href="#">Map View</a></li>
              <li><a href="#">About Us</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3>Popular Areas</h3>
            <ul>
              <li><a href="#">Koramangala</a></li>
              <li><a href="#">HSR Layout</a></li>
              <li><a href="#">Indiranagar</a></li>
              <li><a href="#">Electronic City</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3>Contact Us</h3>
            <p>Email: info&#64;pgfinder.com</p>
            <p>Phone: +91 9876543210</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; {{ currentYear }} PG Finder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #333;
      color: #fff;
      padding: 40px 0 20px;
      margin-top: 50px;
    }
    
    .footer-content {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 30px;
    }
    
    .footer-section h3 {
      font-size: 1.2rem;
      margin-bottom: 15px;
      position: relative;
    }
    
    .footer-section h3:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -5px;
      width: 30px;
      height: 2px;
      background-color: var(--secondary-color);
    }
    
    .footer-section p {
      margin-bottom: 10px;
      font-size: 0.9rem;
      color: #ccc;
    }
    
    .footer-section ul {
      list-style: none;
      padding: 0;
    }
    
    .footer-section ul li {
      margin-bottom: 8px;
    }
    
    .footer-section ul li a {
      color: #ccc;
      text-decoration: none;
      transition: color 0.3s;
      font-size: 0.9rem;
    }
    
    .footer-section ul li a:hover {
      color: var(--secondary-color);
    }
    
    .footer-bottom {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #444;
      font-size: 0.9rem;
      color: #aaa;
    }
    
    @media (max-width: 992px) {
      .footer-content {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (max-width: 576px) {
      .footer-content {
        grid-template-columns: 1fr;
      }
      
      .footer-section {
        margin-bottom: 20px;
      }
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}