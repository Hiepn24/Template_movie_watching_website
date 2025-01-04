import HomeSlide from "../../components/Home/HomeSlide";
import MoviePopularList from "../../components/Home/MoviePopularList";

function Home() {
    return (
        <div className="px-20 py-10">
            <HomeSlide />
            <p className="font-bold text-3xl text-yellow-500 mt-16 mb-5">Popular</p>
            <MoviePopularList />
        </div>
    )
}

export default Home;