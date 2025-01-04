import { useState, useEffect } from "react";
import { Category } from "../../utils/constant";
import { baseApi } from "../../api/axiosInstance"; // Giả định bạn đã cấu hình baseApi
import { imagepath } from "../../utils/constant";
import { Link } from "react-router-dom";

function Movies() {
    const [filter, setFilter] = useState(Category[0]); // Lưu trạng thái nút đang được chọn
    const [carouselMovies, setCarouselMovies] = useState([]); // Dữ liệu phim
    const apiEndpoints = {
        "Now Playing": "/3/movie/now_playing?language=en-US&page=1",
        "Popular": "/3/movie/popular?language=en-US&page=2",
        "Top Rated": "/3/movie/top_rated?language=en-US&page=1",
        "Upcoming": "/3/movie/upcoming?language=en-US&page=1",
    };

    const fetchMovies = async (category) => {
        try {
            const response = await baseApi.get(apiEndpoints[category]);
            setCarouselMovies(response.data.results); // Cập nhật danh sách phim
        } catch (err) {
            console.log(`Fetch ${category} movies error`, err);
        }
    };

    const toggleSelection = (item) => {
        setFilter(item); // Cập nhật trạng thái filter
    };

    useEffect(() => {
        fetchMovies(filter); // Gọi API khi filter thay đổi
    }, [filter]);

    return (
        <div className="px-20 py-10">
            <p className="font-bold text-3xl text-yellow-500 mb-5">Explore Movies</p>
            <div className="flex gap-5 mb-5">
                {Category.map((item, ind) => (
                    <div key={ind} className="text-center">
                        {/* Nút lọc */}
                        <button
                            onClick={() => toggleSelection(item)}
                            className="text-white text-base font-semibold w-44 h-10 hover:bg-[#121212]"
                        >
                            {item}
                        </button>
                        {/* Thanh chỉ báo trạng thái */}
                        <div
                            className={`h-0.5 transition-all duration-300 ${filter === item ? "w-full bg-blue-400" : "w-0"
                                }`}
                        ></div>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 text-white gap-3">
                {carouselMovies.map((movie, ind) => (
                    <Link to={`/details/${movie.id}`} key={ind}>
                        <div className="flex-col rounded-xl hover:border hover:border-white hover:cursor-pointer">
                            <img className="rounded-t-xl" src={imagepath + movie.poster_path} alt={movie.original_title} />
                            <p className="bg-gray-900 hover:underline font-bold line-clamp-1 px-2 pt-2">{movie.original_title}</p>
                            <p className="bg-gray-900 text-sm pl-2">Rating: {String(movie.vote_average).substring(0, 3)}</p>
                            <p className="bg-gray-900 text-sm pl-2">Language: {movie.original_language}</p>
                            <p className="bg-gray-900 text-sm pl-2 py-2 rounded-b-xl">Release: {movie.release_date}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Movies;
