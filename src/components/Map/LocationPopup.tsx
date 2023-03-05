import { CgClose } from "react-icons/cg";
import { FiPlus } from "react-icons/fi";

import { Location } from "@/types";
import { useTripContext } from "@/hooks";

export const LocationPopup = ({ location }: { location: Location }) => {
  const { selectLocation, addLocation, locations, removeLocation } = useTripContext();
  const { title, image, description, category, address, site, phone, lat, long } = location;
  const isLastLocationVisited = locations[locations.length - 1]?.isVisited;

  return (
    <div className="card bg-white w-full max-w-screen-sm mx-auto block p-4 mt-4 shadow-lg">
      <button
        className="absolute top-4 right-4 btn btn-circle btn-xs bg-gray-200 hover:bg-gray-300 text-gray-500 border-none"
        onClick={() => selectLocation(null)}
      >
        <CgClose />
      </button>
      <div className="flex mr-10">
        <div>
          <div
            className="bg-cover w-[68px] h-[68px] bg-center rounded-xl mr-4"
            style={{ backgroundImage: `url(${image})` }}
          />
        </div>
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>

      <div className="my-4">
        <span className="badge bg-gray-300 text-gray-500 border-none">{category}</span>
      </div>
      <p className="text-sm">
        <span className="font-bold">Address:</span> {address}
      </p>
      {phone && (
        <p className="mt-2 text-sm">
          <span className="font-bold">Phone: </span>
          <a href={`tel:${phone}`} className="underline text-primary">
            {phone}
          </a>
        </p>
      )}
      {site && (
        <p className="mt-2 text-sm">
          <span className="font-bold">Website: </span>
          <a href={site} target="_blank" className="underline text-primary" rel="noreferrer">
            {site}
          </a>
        </p>
      )}

      <div className="mt-6 flex">
        {!locations.find((l) => l.id === location.id) && (
          <button
            className="btn btn-primary btn-sm mr-2"
            onClick={() => {
              if (isLastLocationVisited || locations.length === 0) {
                addLocation(location);

                return;
              }
              removeLocation(locations[locations.length - 1].id);
              addLocation(location);
              selectLocation(location);
            }}
          >
            <FiPlus className="mr-2" />
            Add to trip
          </button>
        )}
        <a
          className="btn btn-ghost btn-sm"
          href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${long}`}
          target="_blank"
          rel="noreferrer"
        >
          Get directions on Google Maps
        </a>
      </div>
    </div>
  );
};
