import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";
import { FiMap } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { useTripContext, useUserContext } from "@/hooks";
import { AddedLocationCard, RecommendedLocationCard } from "@/components";

export const MapSidebar = () => {
  const router = useRouter();
  const tab = router.query.tab || "map";

  const { isSidebarOpen, setIsSidebarOpen, recommendedLocations, locations } = useTripContext();
  const { user, logout } = useUserContext();

  return (
    <div className="flex absolute w-full">
      <div className="h-screen border-r border-gray-200 w-16 max-w-16 flex flex-col justify-between items-center py-4 absolute z-50 bg-white">
        <div className="flex flex-col w-full items-center justify-center">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar placeholder"
            onClick={() =>
              router.push({
                pathname: "/trip",
                query: { tab: "profile" },
              })
            }
          >
            <div className="bg-primary text-neutral-content rounded-full w-10">
              <span className="text-xl">{user?.email?.charAt(0).toUpperCase()}</span>
            </div>
          </label>
          <Link
            className={cn("btn btn-ghost btn-square mt-4", {
              border: tab === "map",
            })}
            href={{ pathname: "/trip", query: { tab: "map" } }}
          >
            <FiMap className="text-xl" />
          </Link>
        </div>
        <div className="flex-grow flex flex-col justify-center mb-12">
          <Link
            href="/"
            className="text-2xl font-bold text-green-500 flip-vertical"
            style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}
          >
            AppName
          </Link>
        </div>
        <div>
          <button
            className="btn btn-ghost btn-square rounded-lg"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {!isSidebarOpen ? (
              <IoIosArrowForward className="text-xl" />
            ) : (
              <IoIosArrowBack className="text-xl" />
            )}
          </button>
        </div>
      </div>
      <div
        className={cn(
          "max-w-screen-sm w-full bg-white absolute z-40 shadow-xl h-screen max-h-screen transition-all py-4 px-8 overflow-y-auto",
          {
            "left-16": isSidebarOpen,
            "-left-full": !isSidebarOpen,
          },
        )}
      >
        {tab === "map" && (
          <>
            <h1
              className="text-3xl font-bold  outline-1 py-2 px-1 outline-green-200 rounded-lg hover:outline"
              title="Edit trip name"
              contentEditable
            >
              Trip #1
            </h1>
            <p
              className="mt-2 outline-1 py-2 px-1 outline-green-200 rounded-lg hover:outline"
              contentEditable
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod, voluptate,
              quia, voluptates quas voluptatibus quibusdam
            </p>

            <h2 className="text-2xl font-bold mt-8 px-1 mb-4">Places to visit</h2>

            {locations.map((location, index) => (
              <AddedLocationCard key={location.title} location={location} index={index} />
            ))}
            <p className="text-gray-500 mt-6 px-1">
              {locations.length === 0 &&
                "You can start planning your trip by clicking on the map or by selecting one from the recommended list below."}
              {locations[locations.length - 1]?.isVisited &&
                "Pick the next recommended location to add to your trip."}
              {!locations[locations.length - 1]?.isVisited &&
                locations.length > 0 &&
                "You can change the selected location by choosing a different location from the recommended list below."}
            </p>
            <div className="flex flex-col mt-6">
              {recommendedLocations.map((location, index) => (
                <RecommendedLocationCard
                  key={location.title}
                  location={location}
                  isLast={index === recommendedLocations.length - 1}
                />
              ))}
            </div>
          </>
        )}
        {tab === "profile" && (
          <div className="space-y-2 px-1">
            <h1 className="text-3xl font-bold  outline-1 py-2">My profile</h1>
            <div>
              <p className="text-gray-500 my-2">Email: {user?.email}</p>
            </div>

            <button onClick={logout} className="btn btn-sm">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
