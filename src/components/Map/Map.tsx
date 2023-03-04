/* eslint-disable @next/next/no-img-element */
import { useTripContext } from "@/hooks";
import { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import cn from "classnames";
import { LocationPopup } from "./LocationPopup";

const initViewport = {
  latitude: 47.0105,
  longitude: 28.5,
  zoom: 7,
  width: "calc(100vw - 704px)",
};

export const MapC = () => {
  const { isSidebarOpen, recommendedLocations, selectedLocation, selectLocation, locations } =
    useTripContext();
  const [width, setWidth] = useState("100vw");

  useEffect(() => {
    const newWidth = isSidebarOpen ? "calc(100vw - 704px)" : "100vw";
    setWidth(newWidth);
  }, [isSidebarOpen]);

  const [viewstate, setViewstate] = useState<any>(initViewport);

  useEffect(() => {
    if (selectedLocation) {
      setViewstate({
        latitude: selectedLocation.lat,
        longitude: selectedLocation.long,
        zoom: viewstate.zoom > 12 ? viewstate.zoom : 12,
        transitionDuration: 1000,
      });
    }
  }, [selectedLocation, isSidebarOpen]);

  return (
    <Map
      {...viewstate}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      style={{ width: width, height: "100vh", float: "right" }}
      onMove={(e) => setViewstate(e.viewState)}
    >
      {recommendedLocations
        .filter((location) => !locations.find((l) => l.id === location.id))
        .map((location) => (
          <Marker key={location.title} latitude={location.lat} longitude={location.long}>
            <button
              className="marker-btn"
              onClick={(event) => {
                event.preventDefault();
                selectLocation(location);
              }}
            >
              <img
                src="/images/marker.svg"
                alt="location Marker"
                className={cn({
                  "opacity-50": !selectedLocation?.id || selectedLocation.id !== location.id,
                })}
                width="40"
              />
            </button>
          </Marker>
        ))}

      {locations.map((location, index) => (
        <Marker key={location.title} latitude={location.lat} longitude={location.long}>
          <button
            className="marker-btn"
            onClick={(event) => {
              event.preventDefault();
              selectLocation(location);
            }}
          >
            <div className="bg-primary text-white rounded-full absolute w-[17px] h-[17px] top-[5px] left-[12px] flex items-center justify-center">
              <span className="text-xs font-medium">{index + 1}</span>
            </div>
            <img src="/images/marker-green.svg" alt="location Marker" width="40" />
          </button>
        </Marker>
      ))}

      {selectedLocation && <LocationPopup location={selectedLocation} />}
    </Map>
  );
};
