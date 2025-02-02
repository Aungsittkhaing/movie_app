import DisplayItems from "../components/DisplayItems";
import {
  now_playing,
  popular,
  top_rated_movies,
  upcoming,
} from "../modules/ApiLinks";
import { createDisplayItems, ItemsCategory } from "../modules/types_files";

const Movies = () => {
  const chooseWhatToDisplay: ItemsCategory[] = [
    createDisplayItems(popular, "Popular"),
    createDisplayItems(upcoming, "Upcoming"),
    createDisplayItems(now_playing, "Now Playing"),
    createDisplayItems(top_rated_movies, "Top Rated Movies"),
  ];
  return (
    <>
      <DisplayItems displayTags={chooseWhatToDisplay} />
    </>
  );
};

export default Movies;
