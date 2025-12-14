import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../../../components/Logo/Logo";
import useAuth from "../../../hooks/useAuth";

const NavBar = () => {
  const { user, logOut } = useAuth();

  // 🌗 Theme state
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogOut = () => {
    logOut().catch(console.error);
  };

  const links = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/book-ticket">Book Ticket</NavLink></li>
      <li><NavLink to="/vendor">Be a Vendor</NavLink></li>
      <li><NavLink to="/dashboard">Dashboard</NavLink></li>
      <li><NavLink to="/all-tickets">All Tickets</NavLink></li>
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm md:px-20">
        
        {/* LEFT */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Logo />
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {links}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end gap-3">

          {/* Avatar Dropdown */}
          {user && (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-56 p-3 shadow"
              >
                <li className="font-semibold text-center">
                  {user?.displayName || "User"}
                </li>

                {/* 🌗 Theme Toggle */}
                <li>
                  <label className="flex justify-between cursor-pointer items-center">
                    <span>Dark Mode</span>
                    <input
                      type="checkbox"
                      className="toggle"
                      checked={theme === "dark"}
                      onChange={toggleTheme}
                    />
                  </label>
                </li>

                <li>
                  <button onClick={handleLogOut} className="text-red-500">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}

          {/* Auth Buttons */}
          {user ? (
            <button onClick={handleLogOut} className="btn">
              Log Out
            </button>
          ) : (
            <Link className="btn" to="/login">
              Login
            </Link>
          )}

          <Link className="btn btn-neutral mx-2" to="/vendor">
            Be a Vendor
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
