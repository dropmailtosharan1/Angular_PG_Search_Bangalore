import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hostel } from '../../models/hostel.model';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="map-container">
      <div id="map" class="map"></div>
      <div *ngIf="loading" class="map-loading">
        <p>Loading map...</p>
      </div>
    </div>
  `,
  styles: [`
    .map-container {
      position: relative;
      height: 500px;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: var(--shadow);
    }
    
    .map {
      height: 100%;
      width: 100%;
    }
    
    .map-loading {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.8);
      z-index: 10;
    }
    
    @media (max-width: 768px) {
      .map-container {
        height: 400px;
      }
    }
    
    @media (max-width: 576px) {
      .map-container {
        height: 300px;
      }
    }
  `]
})
export class MapViewComponent implements OnInit, OnChanges {
  @Input() hostels: Hostel[] = [];
  @Input() userLocation: { lat: number, lng: number } | null = null;
  
  loading = true;
  private map: any;
  private markers: any[] = [];
  
  ngOnInit() {
    // Load Google Maps API script
    if (!document.getElementById('google-maps-script')) {
      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap';
      script.async = true;
      script.defer = true;
      
      // Define the callback function globally
      (window as any).initMap = () => {
        this.initializeMap();
      };
      
      document.head.appendChild(script);
    } else {
      this.initializeMap();
    }
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if ((changes['hostels'] || changes['userLocation']) && this.map) {
      this.updateMarkers();
    }
  }
  
  private initializeMap() {
    // Default to Bangalore center if no user location
    const center = this.userLocation || { lat: 12.9716, lng: 77.5946 };
    
    this.map = new (window as any).google.maps.Map(document.getElementById('map'), {
      center: center,
      zoom: 12,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    });
    
    this.updateMarkers();
    this.loading = false;
  }
  
  private updateMarkers() {
    // Clear existing markers
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];
    
    // Add user location marker if available
    if (this.userLocation) {
      const userMarker = new (window as any).google.maps.Marker({
        position: this.userLocation,
        map: this.map,
        icon: {
          path: (window as any).google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#4285F4',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2
        },
        title: 'Your Location'
      });
      
      this.markers.push(userMarker);
    }
    
    // Add hostel markers
    this.hostels.forEach(hostel => {
      const marker = new (window as any).google.maps.Marker({
        position: { lat: hostel.coordinates.lat, lng: hostel.coordinates.lng },
        map: this.map,
        title: hostel.name,
        label: {
          text: '₹' + (hostel.price / 1000).toFixed(1) + 'K',
          color: 'white',
          fontSize: '10px',
          fontWeight: 'bold'
        }
      });
      
      // Create info window
      const infoWindow = new (window as any).google.maps.InfoWindow({
        content: `
          <div style="width: 200px; padding: 5px;">
            <h3 style="margin: 0 0 5px; font-size: 14px;">${hostel.name}</h3>
            <p style="margin: 0 0 5px; font-size: 12px;">${hostel.address}</p>
            <p style="margin: 0; font-size: 12px; color: #4285F4;">${hostel.area}</p>
            <p style="margin: 5px 0; font-weight: bold; color: #4CAF50;">₹${hostel.price}/month</p>
            <a href="/hostel/${hostel.id}" style="color: #4285F4; font-size: 12px;">View Details</a>
          </div>
        `
      });
      
      // Add click listener
      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });
      
      this.markers.push(marker);
    });
    
    // Fit bounds if we have markers
    if (this.markers.length > 0) {
      const bounds = new (window as any).google.maps.LatLngBounds();
      this.markers.forEach(marker => {
        bounds.extend(marker.getPosition());
      });
      this.map.fitBounds(bounds);
      
      // Don't zoom in too far
      const listener = (window as any).google.maps.event.addListener(this.map, 'idle', () => {
        if (this.map.getZoom() > 16) {
          this.map.setZoom(16);
        }
        (window as any).google.maps.event.removeListener(listener);
      });
    }
  }
}