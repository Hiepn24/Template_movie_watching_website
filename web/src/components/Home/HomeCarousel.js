import { useEffect, useState } from "react";
import { imagepath } from "../../utils/constant";
import { baseApi } from "../../api/axiosInstance";
import "../../assets/css/carousel.css";
import { Link } from "react-router-dom";

function HomeCarousel() {
  const [carouselMovies, setCarouselMovies] = useState([]);

  const fetchUpcoming = async () => {
    try {
      const response = await baseApi.get("/3/movie/upcoming?language=en-US&page=1")
      setCarouselMovies(response.data.results);
    } catch (err) {
      console.log("Fetch upcoming movies error", err);
    }
  };

  useEffect(() => {
    fetchUpcoming();
  }, []);

  return (
    <div>
      {carouselMovies.map((movie, ind) => (
        <div key={ind}>
          <div className="nuttrai size-10 justify-center flex pt-1 bg-gray-200 border-[0.5px] border-black rounded-full absolute z-40 top-56 left-5 hover:cursor-pointer">👈</div>
          <div className="nutphai size-10 justify-center flex pt-1 bg-gray-200 border-[0.5px] border-black rounded-full absolute z-40 top-56 right-5 hover:cursor-pointer">👉</div>
          <img
            src={imagepath + movie.backdrop_path}
            className="aspect-[7/4] w-full absolute top-0 left-0"
            // className={`${ind === 0 ? "active" : ""} aspect-[7/4] w-full absolute top-0 left-0`}
            alt={movie.title}
          />
          <div className="w-full flex size-56 bg-black absolute z-40 top-[275px] py-6 px-20 gap-5">
            <img
              src={imagepath + movie.poster_path}
              className={`${ind === 0 ? "active" : ""} w-[160px] h-44`}
              alt={movie.title}
            />
            <div className="">
              <Link to={`/details/${movie.id}`} key={ind}>
                <p className="text-4xl text-white hover:underline hover:cursor-pointer">{movie.original_title}</p>
              </Link>
              <p className="text-xl text-justify text-zinc-400 line-clamp-3 mb-2">{movie.overview}</p>
              <p className="text-white">👍{movie.vote_count}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomeCarousel;
