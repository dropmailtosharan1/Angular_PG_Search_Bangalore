import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  
  constructor() { }
  
  // Get user's current location
  getCurrentLocation(): Observable<GeolocationCoordinates> {
    if (!navigator.geolocation) {
      return of({
        latitude: 12.9716,
        longitude: 77.5946,
        accuracy: 0,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null
      });
    }
    
    return from(
      new Promise<GeolocationCoordinates>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position.coords),
          (error) => reject(error),
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
      })
    ).pipe(
      catchError(() => {
        // Default to Bangalore center coordinates if geolocation fails
        return of({
          latitude: 12.9716,
          longitude: 77.5946,
          accuracy: 0,
          altitude: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null
        });
      })
    );
  }
  
  // Get areas of Bangalore for filtering
  getBangaloreAreas(): Observable<string[]> {
    const areas = [
      'Koramangala',
      'Indiranagar',
      'HSR Layout',
      'Whitefield',
      'Electronic City',
      'Marathahalli',
      'Jayanagar',
      'JP Nagar',
      'Bannerghatta Road',
      'Hebbal',
      'Yelahanka',
      'BTM Layout'
    ];
    
    return of(areas);
  }
}