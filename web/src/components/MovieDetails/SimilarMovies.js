import { useEffect, useState, useCallback } from "react";
import { imagepath } from "../../utils/constant";
import { baseApi } from "../../api/axiosInstance";
import { Link } from "react-router-dom";

function SimilarMovies({ movieId }) {
    const [similarMovies, setSimilarMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    // Tạo hàm fetch ổn định với useCallback
    const fetchSimilarMovies = useCallback(
        async (pageNum) => {
            try {
                setLoading(true);
                const response = await baseApi.get(`/3/movie/${movieId}/similar?language=en-US&page=${pageNum}`);
                const movies = response.data.results;

                if (movies.length === 0) {
                    setHasMore(false);
                } else {
                    setSimilarMovies((prevMovies) => [...prevMovies, ...movies]);
                }
            } catch (err) {
                console.error("Fetch similar movies error", err);
            } finally {
                setLoading(false);
            }
        },
        [movieId] // Chỉ phụ thuộc vào movieId
    );

    useEffect(() => {
        setSimilarMovies([]);
        setPage(1);
        setHasMore(true);
    }, [movieId]);

    useEffect(() => {
        if (movieId) {
            fetchSimilarMovies(page);
        }
    }, [movieId, page, fetchSimilarMovies]);

    const handleLoadMore = () => {
        if (hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-yellow-500 mb-4 mt-16">Similar Movies</h2>
            <div className="grid grid-cols-7 text-white gap-3">
                {similarMovies.map((movie) => (
                    <Link to={`/details/${movie.id}`} key={movie.id}>
                        <div className="flex-col rounded-xl hover:border hover:border-white hover:cursor-pointer">
                            <img
                                className="rounded-t-xl"
                                src={imagepath + movie.poster_path}
                                alt={movie.original_title || "Movie poster"}
                            />
                            <p className="bg-gray-900 hover:underline font-bold line-clamp-1 px-2 pt-2">
                                {movie.original_title}
                            </p>
                            <p className="bg-gray-900 text-sm pl-2">
                                Rating: {String(movie.vote_average).substring(0, 3)}
                            </p>
                            <p className="bg-gray-900 text-sm pl-2">
                                Language: {movie.original_language}
                            </p>
                            <p className="bg-gray-900 text-sm pl-2 py-2 rounded-b-xl">
                                Release: {movie.release_date}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
            {hasMore ? (
                <div className="flex justify-center mt-5">
                    <button
                        className="text-xl text-white font-medium border px-6 py-2 hover:text-black hover:bg-yellow-500"
                        onClick={handleLoadMore}
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Load More..."}
                    </button>
                </div>
            ) : (
                <p className="text-center text-yellow-500 mt-5">No more movies to display.</p>
            )}
        </div>
    );
}

export default SimilarMovies;
