import { useState } from "react";
import cn from "classnames";

import { useTripContext } from "@/hooks";
import { Location } from "@/types";

export const AddedLocationCard = ({ location, index }: { location: Location; index: number }) => {
  const { locations, removeLocation, editLocation, selectLocation, selectedLocation } =
    useTripContext();
  const isLast = index === locations.length - 1;
  const isSelected = selectedLocation?.id === location.id;

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [status, setStatus] = useState<"selected" | "reviewing" | "reviewed">("selected");

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
        <p className="text-sm text-gray-500">
          {location.description.length > 230
            ? `${location.description.slice(0, 230)}...`
            : location.description}
        </p>

        {review && status === "reviewed" && (
          <div tabIndex={0} className="collapse p-0 mt-2">
            <div className="collapse-title text-sm font-medium p-0 min-h-0 w-fit">
              View feedback
            </div>
            <div className="collapse-content text-sm p-0 m-0">
              <div className="rating">
                <input
                  type="radio"
                  name="rating-4"
                  className="mask mask-star-2 bg-green-500"
                  checked={rating >= 1}
                />
                <input
                  type="radio"
                  name="rating-4"
                  className="mask mask-star-2 bg-green-500"
                  checked={rating >= 2}
                />
                <input
                  type="radio"
                  name="rating-4"
                  className="mask mask-star-2 bg-green-500"
                  checked={rating >= 3}
                />
                <input
                  type="radio"
                  name="rating-4"
                  className="mask mask-star-2 bg-green-500"
                  checked={rating >= 4}
                />
                <input
                  type="radio"
                  name="rating-4"
                  className="mask mask-star-2 bg-green-500"
                  checked={rating >= 5}
                />
              </div>
              <p>{review}</p>
            </div>
          </div>
        )}

        {status === "reviewing" && (
          <div className="mt-4">
            <div className="rating">
              <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
              <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
              <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
              <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
              <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
            </div>

            <div className="mt-2">
              <textarea
                className="w-full rounded-lg bg-transparent text-sm focus:outline-none"
                placeholder="Write a review..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                style={{ resize: "none" }}
                ref={(el) => el?.focus()}
              />
            </div>
          </div>
        )}

        {isLast && status === "reviewing" && (
          <div className="flex items-center mt-4">
            <button
              className="btn btn-ghost btn-xs"
              onClick={() => {
                setStatus("reviewed");
              }}
            >
              Submit
            </button>

            <button
              className="btn btn-ghost btn-xs ml-2 text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                editLocation({ ...location, isVisited: false });
                setStatus("selected");
              }}
            >
              Cancel
            </button>
          </div>
        )}

        {isLast && status !== "reviewing" && (
          <div className="flex items-center mt-4">
            <button
              className="btn btn-outline btn-xs"
              onClick={() => {
                editLocation({ ...location, isVisited: !location.isVisited });
                if (!review && !location.isVisited) {
                  setStatus("reviewing");
                }

                if (review && !location.isVisited) {
                  setStatus("reviewed");
                }

                if (review && location.isVisited) {
                  setStatus("selected");
                }
              }}
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
