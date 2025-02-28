import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hostel } from '../models/hostel.model';

@Injectable({
  providedIn: 'root'
})
export class HostelService {
  private hostels: Hostel[] = [
    {
      id: 1,
      name: 'Comfort PG for Men',
      address: '123, 5th Cross, Koramangala',
      area: 'Koramangala',
      price: 9500,
      amenities: ['WiFi', 'AC', 'Food', 'Laundry', 'Power Backup'],
      rating: 4.2,
      gender: 'male',
      imageUrl: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      coordinates: {
        lat: 12.9352,
        lng: 77.6245
      },
      contact: '+91 9876543210',
      description: 'Comfortable PG accommodation with all modern amenities and homely food.'
    },
    {
      id: 2,
      name: 'Elegant Stay for Women',
      address: '45, 2nd Main, Indiranagar',
      area: 'Indiranagar',
      price: 10500,
      amenities: ['WiFi', 'AC', 'Food', 'Gym', 'Security'],
      rating: 4.5,
      gender: 'female',
      imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      coordinates: {
        lat: 12.9784,
        lng: 77.6408
      },
      contact: '+91 9876543211',
      description: 'Safe and secure PG for women with all necessary facilities and 24/7 security.'
    },
    {
      id: 3,
      name: 'Tech Hub PG',
      address: '78, Electronics City Phase 1',
      area: 'Electronics City',
      price: 8000,
      amenities: ['WiFi', 'Food', 'Parking', 'TV Room'],
      rating: 3.8,
      gender: 'unisex',
      imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      coordinates: {
        lat: 12.8399,
        lng: 77.6770
      },
      contact: '+91 9876543212',
      description: 'Affordable PG accommodation near tech parks with basic amenities.'
    },
    {
      id: 4,
      name: 'Premium Living',
      address: '34, Whitefield Main Road',
      area: 'Whitefield',
      price: 12000,
      amenities: ['WiFi', 'AC', 'Food', 'Gym', 'Swimming Pool', 'Gaming Zone'],
      rating: 4.7,
      gender: 'unisex',
      imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      coordinates: {
        lat: 12.9698,
        lng: 77.7499
      },
      contact: '+91 9876543213',
      description: 'Luxury PG with premium amenities and excellent connectivity to IT parks.'
    },
    {
      id: 5,
      name: 'Budget Stay',
      address: '56, 3rd Block, Jayanagar',
      area: 'Jayanagar',
      price: 7500,
      amenities: ['WiFi', 'Food', 'Laundry'],
      rating: 3.5,
      gender: 'male',
      imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      coordinates: {
        lat: 12.9299,
        lng: 77.5933
      },
      contact: '+91 9876543214',
      description: 'Economical PG option with basic facilities and good connectivity.'
    },
    {
      id: 6,
      name: 'Green View PG',
      address: '89, HSR Layout Sector 2',
      area: 'HSR Layout',
      price: 11000,
      amenities: ['WiFi', 'AC', 'Food', 'Gym', 'Terrace Garden'],
      rating: 4.3,
      gender: 'female',
      imageUrl: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      coordinates: {
        lat: 12.9116,
        lng: 77.6741
      },
      contact: '+91 9876543215',
      description: 'PG with beautiful surroundings and modern amenities for women.'
    }
  ];

  constructor() { }

  getHostels(): Observable<Hostel[]> {
    return of(this.hostels);
  }

  getHostelById(id: number): Observable<Hostel | undefined> {
    const hostel = this.hostels.find(h => h.id === id);
    return of(hostel);
  }

  searchHostels(query: string, filters: any): Observable<Hostel[]> {
    let filteredHostels = [...this.hostels];
    
    // Filter by search query (name or area)
    if (query) {
      const lowerQuery = query.toLowerCase();
      filteredHostels = filteredHostels.filter(hostel => 
        hostel.name.toLowerCase().includes(lowerQuery) || 
        hostel.area.toLowerCase().includes(lowerQuery) ||
        hostel.address.toLowerCase().includes(lowerQuery)
      );
    }
    
    // Filter by price range
    if (filters.minPrice !== undefined) {
      filteredHostels = filteredHostels.filter(hostel => hostel.price >= filters.minPrice);
    }
    
    if (filters.maxPrice !== undefined) {
      filteredHostels = filteredHostels.filter(hostel => hostel.price <= filters.maxPrice);
    }
    
    // Filter by gender
    if (filters.gender && filters.gender !== 'all') {
      filteredHostels = filteredHostels.filter(hostel => 
        hostel.gender === filters.gender || hostel.gender === 'unisex'
      );
    }
    
    // Filter by amenities
    if (filters.amenities && filters.amenities.length > 0) {
      filteredHostels = filteredHostels.filter(hostel => 
        filters.amenities.every((amenity: string) => 
          hostel.amenities.includes(amenity)
        )
      );
    }
    
    return of(filteredHostels);
  }

  // Calculate distance between two coordinates (using Haversine formula)
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    return distance;
  }
  
  private deg2rad(deg: number): number {
    return deg * (Math.PI/180);
  }

  // Get hostels sorted by distance from user location
  getHostelsByLocation(userLat: number, userLng: number): Observable<Hostel[]> {
    const hostelsWithDistance = this.hostels.map(hostel => {
      const distance = this.calculateDistance(
        userLat, 
        userLng, 
        hostel.coordinates.lat, 
        hostel.coordinates.lng
      );
      return { ...hostel, distance };
    });
    
    // Sort by distance
    hostelsWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    
    return of(hostelsWithDistance);
  }
}