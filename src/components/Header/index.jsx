import React from "react";
import { TbBuildingStore, TbFileInfo } from "react-icons/tb";
import { AiTwotoneAppstore } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import User from "../../assets/user.png";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction } from "../../redux/reducers/auth";
import { Link, useNavigate } from "react-router-dom";
import http from "../../helper/http";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [profile, setProfile] = React.useState({});

  const getProfile = async () => {
    try {
      const { data } = await http(token).get("/profile");
      setProfile(data.results);
    } catch (error) {
      const message = error?.response?.data?.error;
      return message;
    }
  };

  React.useEffect(() => {
    getProfile();
  }, []);

  function doLogout() {
    dispatch(logoutAction());
    navigate("/");
  }
  return (
    <div className="navbar bg-primary rounded-b-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="flex flex-col gap-3 menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-md font-semibold"
          >
            <div className="flex flex-col gap-2 w-full items-center">
              <div className="w-14 h-14 overflow-hidden rounded-[100%] shadow-lg">
                <img
                  src={User}
                  alt="user"
                  className="h-full w-full object-fit"
                />
              </div>
              <p className="font-semibold text-md text-black">
                {profile?.fullName}
              </p>
              <p className="text-black">{profile?.email}</p>
            </div>
            <li>
              <Link to="/products" className="text-black flex gap-2">
                <AiTwotoneAppstore size={20} /> Homepage
              </Link>
            </li>
            <li>
              <a className="text-black flex gap-2">
                <TbFileInfo size={20} />
                Abaut
              </a>
            </li>
            <li>
              <button onClick={doLogout} className="text-black flex gap-2">
                <BiLogOut size={20} />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-2xl font-bold text-white flex">
          <TbBuildingStore size={40} className="drop-shadow-md" />
          Klontong
        </a>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Header;
