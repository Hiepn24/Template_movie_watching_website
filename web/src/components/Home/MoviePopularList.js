import { useEffect, useState } from "react";
import { imagepath } from "../../utils/constant";
import { baseApi } from "../../api/axiosInstance";
import { Link } from "react-router-dom";

function MoviePopularList() {
    const [carouselMovies, setCarouselMovies] = useState([]);
    const [page, setPage] = useState(1); // Trạng thái quản lý trang hiện tại
    const [loading, setLoading] = useState(false); // Quản lý trạng thái loading

    const fetchPopular = async (pageNum) => {
        try {
            setLoading(true); // Bắt đầu tải dữ liệu
            const response = await baseApi.get(`/3/movie/popular?language=en-US&page=${pageNum}`);
            setCarouselMovies((prevMovies) => [...prevMovies, ...response.data.results]);
        } catch (err) {
            console.log("Fetch popular movies error", err);
        } finally {
            setLoading(false); // Kết thúc tải dữ liệu
        }
    };

    useEffect(() => {
        fetchPopular(page); // Tải dữ liệu trang đầu tiên khi component được render
    }, [page]);

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1); // Tăng giá trị trang để tải thêm dữ liệu
    };

    return (
        <div>
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
            <div className="flex justify-center mt-5">
                <button
                    className="text-xl text-white font-medium border px-6 py-2 hover:text-black hover:bg-yellow-500"
                    onClick={handleLoadMore}
                    disabled={loading} // Vô hiệu hóa nút khi đang tải
                >
                    {loading ? "Loading..." : "Load More..."}
                </button>
            </div>
        </div>
    );
}

export default MoviePopularList;