import DisplayItems from "../components/DisplayItems";
import {
  airing_today,
  now_playing,
  popular,
  popularShows,
  trendingShows,
  upcoming,
} from "../modules/ApiLinks";
import { createDisplayItems, ItemsCategory } from "../modules/types_files";

const Home = () => {
  const chooseWhatToDisplay: ItemsCategory[] = [
    createDisplayItems(popular, "Popular"),
    createDisplayItems(trendingShows, "Trending Shows"),
    createDisplayItems(now_playing, "Now Playing"),
    createDisplayItems(upcoming, "Upcoming"),
    createDisplayItems(popularShows, "Popular on Tv"),
    createDisplayItems(airing_today, "on Air Today"),
  ];
  return (
    <>
      <DisplayItems displayTags={chooseWhatToDisplay} />
    </>
  );
};

export default Home;
