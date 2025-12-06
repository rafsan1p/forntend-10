import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { signOut } from "firebase/auth";
import auth from "../firebase/firebase.config";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [isChecked, setIsChecked] = useState(false);

  const handleThemeChange = () => {
    setIsChecked((prev) => !prev);
  };

  useEffect(() => {
    const theme = isChecked ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
  }, [isChecked]);

  const handleSignOut = () => {
    toast.success("Logout Successful!");
    signOut(auth);
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1000 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-primary font-bold" : ""
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  isActive ? "text-primary font-bold" : ""
                }
              >
                Services
              </NavLink>
            </li>

            {user && (
              <>
                <li>
                  <NavLink
                    to={"/profile"}
                    className={({ isActive }) =>
                      isActive ? "text-primary font-bold" : ""
                    }
                  >
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/add-services"}
                    className={({ isActive }) =>
                      isActive ? "text-primary font-bold" : ""
                    }
                  >
                    Add Services
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/my-services"}
                    className={({ isActive }) =>
                      isActive ? "text-primary font-bold" : ""
                    }
                  >
                    My Services
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/my-orders"}
                    className={({ isActive }) =>
                      isActive ? "text-primary font-bold" : ""
                    }
                  >
                    My Orders
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">PetPaw</a>
      </div>
      <div className="navbar-center hidden lg:flex ml-26">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-primary font-bold" : ""
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                isActive ? "text-primary font-bold" : ""
              }
            >
              Services
            </NavLink>
          </li>

          {user && (
            <>
              <li>
                <NavLink
                  to={"/profile"}
                  className={({ isActive }) =>
                    isActive ? "text-primary font-bold" : ""
                  }
                >
                  My Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/add-services"}
                  className={({ isActive }) =>
                    isActive ? "text-primary font-bold" : ""
                  }
                >
                  Add Services
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/my-services"}
                  className={({ isActive }) =>
                    isActive ? "text-primary font-bold" : ""
                  }
                >
                  My Services
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/my-orders"}
                  className={({ isActive }) =>
                    isActive ? "text-primary font-bold" : ""
                  }
                >
                  My Orders
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="navbar-end">
        <label className="toggle text-base-content">
          <input
            onClick={handleThemeChange}
            type="checkbox"
            value="synthwave"
            className="theme-controller"
          />

          <svg
            aria-label="sun"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </g>
          </svg>

          <svg
            aria-label="moon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </g>
          </svg>
        </label>
      </div>

      {user && (
        <div className="ml-4">
          <button onClick={handleSignOut} className="btn btn-sm lg:btn-md">
            Logout
          </button>
        </div>
      )}
      {!user && (
        <div className="ml-4">
          <NavLink to={"/login"} className="btn btn-sm lg:btn-md">
            Login
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
