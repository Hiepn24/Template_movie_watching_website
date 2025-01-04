import { useEffect, useState } from "react";
import { baseApi } from "../../api/axiosInstance";
import { imagepath } from "../../utils/constant";
import { Link } from "react-router-dom";

function HomeCarouselList() {
    const [carouselMovies, setCarouselMovies] = useState([]);

    const fetchUpcoming = async () => {
        try {
            const response = await baseApi.get("/3/movie/upcoming?language=en-US&page=1");
            // Lấy 3 bộ phim đầu tiên từ response
            setCarouselMovies(response.data.results.slice(0, 3));
        } catch (err) {
            console.log("Fetch upcoming movies error", err);
        }
    };

    useEffect(() => {
        fetchUpcoming();
    }, []);

    return (
        <div className="grid-cols-1">
            <p className="font-bold text-2xl text-yellow-500 mb-2">Up Next</p>
            {carouselMovies.map((movie, ind) => (
                <div className="flex gap-3">
                    <img
                        src={imagepath + movie.poster_path}
                        className="w-[160px] h-36"
                        alt={movie.title}
                    />
                    <div className="grid-cols-1 text-white">
                        <Link to={`/details/${movie.id}`} key={ind}>
                            <p className="font-bold hover:underline hover:cursor-pointer text-lg">{movie.title}</p>
                        </Link>
                        <p className="text-sm text-justify line-clamp-3">{movie.overview}</p>
                        <p className="text-sm mb-2">Release day: {movie.release_date}</p>
                        <p>👍{movie.vote_count}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default HomeCarouselList;