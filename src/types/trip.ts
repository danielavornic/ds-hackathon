export interface Trip {
  id: string;
  name: string;
  description: string;
  locations: Location[];
  recommendedLocations: Location[];
}

export interface Location {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  description: string;
  image: string;
  site?: string;
  phone?: string;
  address?: string;
  isVisited: boolean;
}
