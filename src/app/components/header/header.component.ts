import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="container header-container">
        <div class="logo">
          <a routerLink="/">
            <h1>PG Finder</h1>
            <span>Bangalore</span>
          </a>
        </div>
        <nav class="nav">
          <ul>
            <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a></li>
            <li><a routerLink="/map" routerLinkActive="active">Map View</a></li>
            <li><a routerLink="/about" routerLinkActive="active">About</a></li>
          </ul>
        </nav>
        <button class="menu-toggle" (click)="toggleMenu()">
          <span class="material-icons">{{ isMenuOpen ? 'close' : 'menu' }}</span>
        </button>
        <div class="mobile-nav" [class.open]="isMenuOpen">
          <ul>
            <li><a routerLink="/" (click)="closeMenu()">Home</a></li>
            <li><a routerLink="/map" (click)="closeMenu()">Map View</a></li>
            <li><a routerLink="/about" (click)="closeMenu()">About</a></li>
          </ul>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background-color: var(--primary-color);
      color: white;
      padding: 15px 0;
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    
    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .logo a {
      color: white;
      text-decoration: none;
      display: flex;
      flex-direction: column;
    }
    
    .logo h1 {
      font-size: 1.5rem;
      margin: 0;
      font-weight: 700;
    }
    
    .logo span {
      font-size: 0.8rem;
      opacity: 0.8;
    }
    
    .nav ul {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    
    .nav li {
      margin-left: 20px;
    }
    
    .nav a {
      color: white;
      text-decoration: none;
      font-weight: 500;
      padding: 5px 0;
      position: relative;
    }
    
    .nav a:after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: white;
      transition: width 0.3s;
    }
    
    .nav a:hover:after, .nav a.active:after {
      width: 100%;
    }
    
    .menu-toggle {
      display: none;
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 1.5rem;
    }
    
    .mobile-nav {
      display: none;
    }
    
    @media (max-width: 768px) {
      .nav {
        display: none;
      }
      
      .menu-toggle {
        display: block;
      }
      
      .mobile-nav {
        display: block;
        position: fixed;
        top: 60px;
        left: 0;
        right: 0;
        background-color: var(--primary-color);
        padding: 20px;
        transform: translateY(-100%);
        transition: transform 0.3s ease-in-out;
        z-index: 999;
      }
      
      .mobile-nav.open {
        transform: translateY(0);
      }
      
      .mobile-nav ul {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      
      .mobile-nav li {
        margin-bottom: 15px;
      }
      
      .mobile-nav a {
        color: white;
        text-decoration: none;
        font-size: 1.1rem;
        display: block;
        padding: 5px 0;
      }
    }
  `]
})
export class HeaderComponent {
  isMenuOpen = false;
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  
  closeMenu() {
    this.isMenuOpen = false;
  }
}