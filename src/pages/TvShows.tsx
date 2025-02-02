import DisplayItems from "../components/DisplayItems";
import {
  airing_today,
  now_playing,
  popularShows,
  top_rated_shows,
  trendingShows,
  upcoming,
} from "../modules/ApiLinks";
import { createDisplayItems, ItemsCategory } from "../modules/types_files";

const TvShows = () => {
  const chooseWhatToDisplay: ItemsCategory[] = [
    createDisplayItems(popularShows, "Popular on Tv"),
    createDisplayItems(trendingShows, "Trending Shows"),
    createDisplayItems(top_rated_shows, "Top Rated Shows"),
    createDisplayItems(airing_today, "on Air Today"),
    createDisplayItems(now_playing, "Now Playing"),
    createDisplayItems(upcoming, "Upcoming"),
  ];
  return (
    <>
      <DisplayItems displayTags={chooseWhatToDisplay} />
    </>
  );
};

export default TvShows;
