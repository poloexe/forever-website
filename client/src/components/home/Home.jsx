import LatestCollection from "./LatestCollection";
import Hero from "./Hero";
import BestSeller from "./BestSeller";
import OurPolicy from "./OurPolicy";
import NewsLetter from "./NewsLetter";

const Home = () => {
  return (
    <>
      <div className="flex flex-col gap-12">
        {/* Hero Section */}
        <Hero />

        {/* Latest Collction */}
        <LatestCollection />

        {/* Best Seller */}
        <BestSeller />

        {/* Our Policy */}
        <OurPolicy />

        <NewsLetter />
      </div>
    </>
  );
};

export default Home;
