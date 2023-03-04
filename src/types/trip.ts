export interface Trip {
  id: string;
  name: string;
  description: string;
  locations: Location[];
  recommendedLocations: Location[];
}

export interface Location {
  id: string;
  lat: number;
  long: number;
  title: string;
  description: string;
  image: string;
  category: string;
  tags?: string[];
  site?: string;
  phone?: string;
  address?: string;
  isVisited: boolean;
}
