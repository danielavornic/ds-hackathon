import cn from "classnames";

import { useTripContext } from "@/hooks";
import { Location } from "@/types";
import { CgClose } from "react-icons/cg";

export const AddedLocationCard = ({ location, index }: { location: Location; index: number }) => {
  const { locations, removeLocation, editLocation, selectLocation, selectedLocation } =
    useTripContext();
  const isLast = index === locations.length - 1;
  const isSelected = selectedLocation?.id === location.id;

  return (
    <div
      className={cn("flex group items-stretch cursor-pointer", { "mb-4": !isLast })}
      onClick={() => selectLocation(location)}
    >
      {isSelected && <div className="w-1 bg-primary rounded-l-xl" />}

      <div
        className={cn("mr-4 flex-1 bg-gray-100 rounded-lg p-4", {
          "pl-5": !isSelected,
          "rounded-l-none": isSelected,
        })}
      >
        <h3 className="text-lg font-bold mb-2">
          {index + 1}. {location.title}
        </h3>
        <p className="text-sm text-gray-500">{location.description}</p>

        {isLast && (
          <div className="flex items-center mt-4">
            <button
              className="btn btn-ghost btn-xs"
              onClick={() => editLocation({ ...location, isVisited: !location.isVisited })}
            >
              {!location.isVisited ? "Mark as visited" : "Mark as not visited"}
            </button>

            <button
              className="btn btn-ghost btn-xs ml-2 text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                removeLocation(location.id);
              }}
            >
              Remove
            </button>
          </div>
        )}
      </div>

      <div>
        <div
          className="bg-cover w-24 h-24 bg-center rounded-xl"
          style={{ backgroundImage: `url(${location.image})` }}
        />
      </div>
    </div>
  );
};
