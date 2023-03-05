import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { useUserContext } from "@/hooks";

const menuItems = [
  {
    name: "About",
    href: "/about",
  },
];

export const Navbar = () => {
  const { user, logout } = useUserContext();

  return (
    <>
      <header className="navbar bg-base-100 container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FiMenu className="text-2xl" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <Link href="/" className="text-xl font-bold">
            App Name
          </Link>
        </div>
        <div className="navbar-end">
          <ul className="hidden lg:flex menu menu-horizontal px-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                  <span className="text-xl">{user.email?.charAt(0).toUpperCase()}</span>
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href={{ pathname: "/trip", query: { tab: "profile" } }}>My trips</Link>
                </li>
                <li>
                  <Link href="/profile">Profile</Link>
                </li>
                <li onClick={logout}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex">
              <Link href="/signin" className="btn btn-outline btn-primary mr-2 text-base">
                Sign in
              </Link>
              <Link href="/signup" className="btn btn-primary text-base">
                Sign up
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
