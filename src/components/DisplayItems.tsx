import React, { useEffect } from "react";
import { DataTypes, ItemsCategory } from "../modules/types_files";
import axios from "axios";

interface DisplayItemsProps {
  displayTags: ItemsCategory[];
}
const DisplayItems: React.FC<DisplayItemsProps> = ({ displayTags }) => {
  return (
    <div>
      {displayTags.map(({ apiEndpoint, itemHeading }) => (
        <CategorySection
          key={apiEndpoint}
          apiEndpoint={apiEndpoint}
          itemHeading={itemHeading}
        />
      ))}
    </div>
  );
};
const CategorySection: React.FC<ItemsCategory> = ({
  apiEndpoint,
  itemHeading,
}) => {
  const [apiData, setApiData] = React.useState<DataTypes[]>([]);
  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const response = await axios.get(apiEndpoint);
        setApiData(response.data.results.slice(0, 5));
      } catch (e) {
        console.error("Error fetching data", e);
      }
    };
    fetchApiData();
  }, [apiEndpoint]);
  return (
    <div className="bg-gray-800">
      <div className="my-6 text-center sm:w-56 bg-gradient-to-l from-gray-900 to-gray-600">
        <h1 className="navbar-Text font-bold lg:text-2xl text-natural-50 p-4 py-1">
          {itemHeading}
        </h1>
      </div>
      <div className="flex flex-wrap justify-evenly items-center space-x-0 mt-1 mx-4">
        {apiData.map((movie) => (
          <div
            key={movie.id}
            className="text-neutral-300 flex items-center flex-col justify-center bg-slate-700 rounded-lg pt-4 mt-4 w-60 h-[24rem] m-1 cursor-pointer scale-95 transition duration-300 hover:shadow-[0px_1px_5px_1px_#0080ff] hover:scale-100"
          >
            {/* https://image.tmdb.org/t/p/w200/${movie.poster_path} */}
            {/* https://image.tmdb.org/t/p/original/${movie.poster_path} */}
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              className="rounded-lg border-0 w-60 hover:shadow-[0px_1px_5px_1px_#0080ff]"
            />
            <div className="pb-2">
              <p className="text-xl font-bold  movie-Title">{movie.title}</p>
            </div>
            <div className="pb-2">
              <p className="text-xl font-bold truncate-Text">{movie.name}</p>
            </div>
            <p className="flex items-center justify-center rounded-md w-14 relative right-[6.5rem] bottom-[25.5rem] font-semibold text-lg text-black bg-[#ff4000]">
              {movie.vote_average.toFixed(1)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayItems;
