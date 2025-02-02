import axios from "axios";
import { apiKey, baseUrl, popular, popularShows } from "../modules/ApiLinks";
import React, { useState } from "react";
import logo from "../assets/play.png";
import user from "../assets/react.svg";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [movieData, setMovieData] = useState({
    backdropPath: "",
    title: "",
    overview: "",
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const fetchData = async (page: string) => {
    let url = `${baseUrl}/${page}?api_key=${apiKey}`;
    if (url === "tv") {
      url = `${popularShows}`;
    } else {
      url = `${popular}`;
    }
    try {
      const response = await axios.get(url);
      const data = await response.data;
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const randomMedia = data.results[randomIndex];

      if (randomMedia && randomMedia.backdrop_path) {
        setMovieData({
          backdropPath: `https://image.tmdb.org/t/p/original/${randomMedia.backdrop_path}`,
          title: randomMedia.title || randomMedia.name,
          overview: randomMedia.overview || " ",
        });
      }
    } catch (e) {
      console.log("Error fetching data", e);
    }
  };
  React.useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath.includes("movies")) {
      fetchData("movie");
    } else if (currentPath.includes("tvshows")) {
      fetchData("tv");
    } else {
      fetchData("movie");
    }
  }, []);
  return (
    <div
      className="relative bg-cover bg-center h-screen text-white"
      style={{ backgroundImage: `url(${movieData.backdropPath})` }}
    >
      <div className="p-10 left-0 top-0 w-full z-50 duration-500 fixed ease-out bg-gradient-to-b from-black/70 to-transparent">
        <div className="flex justify-between items-center h-24 px-6">
          <img src={logo} className="relative xl:w-[100px] lg:w-[100px] w-10" />
          <div className="hidden md:flex space-x-10 lg:text-3xl md:text-xl font-bold text-gray-300">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `cursor-pointer hover:text-white ${
                  isActive ? "text-blue-400 scale-125" : " "
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="movies"
              className={({ isActive }) =>
                `cursor-pointer hover:text-white ${
                  isActive ? "text-blue-400 scale-125" : " "
                }`
              }
            >
              Movies
            </NavLink>
            <NavLink
              to="tvshows"
              className={({ isActive }) =>
                `cursor-pointer hover:text-white ${
                  isActive ? "text-blue-400 scale-125" : " "
                }`
              }
            >
              Tv Shows
            </NavLink>
          </div>
          <div className="hidden md:flex items-center">
            <input
              type="text"
              className="border-none outline-none p-2 px-4 xl:w-96 lg:w-44 bg-[#f8f8f837] rounded-full text-white"
              placeholder="Search"
            />
            <span className="relative -left-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </span>
            <img
              src={user}
              className="w-10 h-10 cursor-pointer rounded-full duration-300 ease-in-out hover:scale-110 hover:rotate-90"
            />
          </div>
          <button
            className="text-white block md:hidden text-3xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`fixed top-0 right-0 h-full bg-black bg-opacity-90 text-white z-50 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <button
          className="absolute top-4 right-4 text-3xl"
          onClick={() => setIsMenuOpen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex flex-col items-start space-y-4 py-8 px-6 navbar-Text">
          <NavLink
            to={"/"}
            className={"text-xl cursor-pointer hover:text-gray-400"}
          >
            Home
          </NavLink>
          <NavLink
            to={"movies"}
            className={"text-xl cursor-pointer hover:text-gray-400"}
          >
            Movies
          </NavLink>
          <NavLink
            to={"tvshows"}
            className={"text-xl cursor-pointer hover:text-gray-400"}
          >
            Tv Shows
          </NavLink>
        </div>
        <div className="mt-4 px-6">
          <input
            type="text"
            className="w-full p-2 rouded-full text-black bg-gray-300"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="absolute inset-0 flex flex-col justify-center items-start text-left px-8 bg-black bg-opacity-50">
        <h1 className="text-5xl font-bold mb-4 tracking-wide movie-Title">
          {movieData.title}
        </h1>
        <p className="text-xl max-w-2xl overview-Text">{movieData.overview}</p>
        <button className="mt-4 p-2 bg-[#5f77aba3] font-bold rounded-lg duration-300 ease-in-out hover:bg-[#5f77ab] hover:text-black flex flex-row-reverse items-center justify-center w-24 movie-Title">
          More
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
