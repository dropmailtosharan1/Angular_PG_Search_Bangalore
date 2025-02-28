export interface Hostel {
  id: number;
  name: string;
  address: string;
  area: string;
  price: number;
  amenities: string[];
  rating: number;
  gender: 'male' | 'female' | 'unisex';
  imageUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  contact: string;
  description: string;
  distance?: number; // Optional field for distance from user
}