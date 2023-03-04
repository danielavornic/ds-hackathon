import cn from "classnames";
import { FiPlus } from "react-icons/fi";

import { Location } from "@/types";
import { useTripContext } from "@/hooks";

export const RecommendedLocationCard = ({
  location,
  isLast,
}: {
  location: Location;
  isLast: boolean;
}) => {
  const { selectLocation, selectedLocation, addLocation, locations, removeLocation } =
    useTripContext();
  const { title, image, id } = location;

  const isLastLocationVisited = locations[locations.length - 1]?.isVisited;

  return (
    <div
      className={cn(
        "flex items-center justify-between bg-white rounded-lg border border-gray-200 h-16 cursor-pointer",
        {
          "mb-4": !isLast,
          "border-solid": selectedLocation?.id === id,
          "border-dashed": selectedLocation?.id !== id,
        },
      )}
      onClick={() => selectLocation(location)}
    >
      <div
        className="bg-cover w-16 bg-center h-16 rounded-l-lg"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="p-4 flex w-full justify-between items-center">
        <h3 className="text font-semibold">{title}</h3>
        <button
          className="btn btn-sm bg-gray-200 btn-circle border-gray-200 text-gray-500 hover:text-white"
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
          <FiPlus className="text-xl" />
        </button>
      </div>
    </div>
  );
};
