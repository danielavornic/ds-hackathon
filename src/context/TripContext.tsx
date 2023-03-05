import { createContext, useReducer } from "react";

import { Trip, Location } from "@/types";

const recommendedLocations = [
  {
    id: "1",
    lat: 47.0245,
    long: 28.8321,
    title: "National Museum of History of Moldova",
    description: "The National Museum of History of Moldova is a museum in Chișinău, Moldova.",
    image: "https://placekitten.com/200/300",
    category: "Museum",
    tags: ["history", "culture"],
    site: "https://www.nationalmuseum.md/en/",
    phone: "+373 22 244 524",
    address: "Strada 31 August 1989 121A, Chișinău, Moldova",
    isVisited: false,
  },
  {
    id: "2",
    lat: 47.0242,
    long: 28.8326,
    title: "Milestii Mici Winery",
    description:
      "Milestii Mici Winery is the largest underground wine cellar in the world, located in Moldova.",
    image: "https://placekitten.com/200/300",
    category: "Winery",
    tags: ["wine", "cellar"],
    site: "https://www.milestii-mici.md/",
    phone: "+373 22 561 555",
    address: "Mileștii Mici, Moldova",
    isVisited: false,
  },
  {
    id: "3",
    lat: 47.0287,
    long: 28.8468,
    title: "Ștefan cel Mare Central Park",
    description: "Ștefan cel Mare Central Park is a park in the center of Chișinău, Moldova.",
    image: "https://placekitten.com/200/300",
    category: "Park",
    tags: ["nature", "relaxation"],
    site: "",
    phone: "",
    address: "Bulevardul Ștefan cel Mare și Sfânt, Chișinău, Moldova",
    isVisited: false,
  },
  {
    id: "4",
    lat: 47.3028,
    long: 28.8356,
    title: "Capriana Monastery",
    description: "Capriana Monastery is a monastery in Capriana, Moldova.",
    image: "https://placekitten.com/200/300",
    category: "Monastery",
    tags: ["religion", "history"],
    site: "",
    phone: "",
    address: "Capriana, Moldova",
    isVisited: false,
  },
];

interface TripContext extends Trip {
  isSidebarOpen: boolean;
  selectedLocation?: Location;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  addRecommendations: (recommendations: any[]) => void;
  addLocation: (location: any) => void;
  editLocation: (location: any) => void;
  removeLocation: (locationId: string) => void;
  selectLocation: (location: any) => void;
}

const initialState: TripContext = {
  id: "",
  name: "Trip #1",
  description: "Trip description",
  locations: [],
  selectedLocation: undefined,
  recommendedLocations: recommendedLocations,
  setTitle: () => {},
  setDescription: () => {},
  addRecommendations: () => {},
  addLocation: () => {},
  editLocation: () => {},
  removeLocation: () => {},
  isSidebarOpen: true,
  setIsSidebarOpen: () => {},
  selectLocation: () => {},
};

export const TripContext = createContext<TripContext>(initialState);

const tripReducer = (state: TripContext, action: any) => {
  switch (action.type) {
    case "SET_TITLE": {
      return {
        ...state,
        title: action.payload,
      };
    }
    case "SET_DESCRIPTION": {
      return {
        ...state,
        description: action.payload,
      };
    }
    case "SET_IS_SIDEBAR_OPEN": {
      return {
        ...state,
        isSidebarOpen: action.payload,
      };
    }
    case "ADD_RECOMMENDATIONS": {
      return {
        ...state,
        locations: [...state.locations, ...action.payload],
      };
    }
    case "ADD_LOCATION": {
      // TODO: send to backend for recommendations
      return {
        ...state,
        locations: [...state.locations, action.payload],
      };
    }
    case "REMOVE_LOCATION": {
      console.log(
        state.locations.filter((location) => location.id !== action.payload),
        action.payload,
      );
      return {
        ...state,
        locations: state.locations.filter((location) => location.id !== action.payload),
      };
    }
    case "EDIT_LOCATION": {
      return {
        ...state,
        locations: state.locations.map((location) => {
          if (location.id === action.payload.id) {
            return action.payload;
          }
          return location;
        }),
      };
    }
    case "SELECT_LOCATION": {
      return {
        ...state,
        selectedLocation: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export const TripProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(tripReducer, initialState);

  return (
    <TripContext.Provider
      value={{
        ...state,
        setTitle: (title: string) => {
          dispatch({
            type: "SET_TITLE",
            payload: title,
          });
        },
        setDescription: (description: string) => {
          dispatch({
            type: "SET_DESCRIPTION",
            payload: description,
          });
        },
        addRecommendations: (locations: any) => {
          dispatch({
            type: "ADD_RECOMMENDATIONS",
            payload: locations,
          });
        },
        addLocation: (location: any) => {
          dispatch({
            type: "ADD_LOCATION",
            payload: location,
          });
        },
        removeLocation: (locationId: string) => {
          dispatch({
            type: "REMOVE_LOCATION",
            payload: locationId,
          });
        },
        editLocation: (location: any) => {
          dispatch({
            type: "EDIT_LOCATION",
            payload: location,
          });
        },
        setIsSidebarOpen: (isSidebarOpen: boolean) => {
          dispatch({
            type: "SET_IS_SIDEBAR_OPEN",
            payload: isSidebarOpen,
          });
        },
        selectLocation: (location: any) => {
          dispatch({
            type: "SELECT_LOCATION",
            payload: location,
          });
        },
      }}
    >
      {children}
    </TripContext.Provider>
  );
};
