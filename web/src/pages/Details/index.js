import { useParams } from "react-router-dom";
import { baseApi } from "../../api/axiosInstance";
import { useEffect, useState, useCallback } from "react";
import { imagepath } from "../../utils/constant";
import Trailers from "../../components/MovieDetails/Trailers";
import SimilarMovies from "../../components/MovieDetails/SimilarMovies";

function Details() {
    const params = useParams();
    const [movieDetails, setMovieDetails] = useState(null);

    // Định nghĩa hàm fetchDetails với useCallback
    const fetchDetails = useCallback(async () => {
        try {
            const response = await baseApi.get(`/3/movie/${params.id}?language=en-US`);
            setMovieDetails(response.data);
        } catch (error) {
            console.error("Fetch Details error", error);
        }
    }, [params.id]); // params.id là dependency duy nhất

    useEffect(() => {
        fetchDetails();
    }, [fetchDetails]); // Thêm fetchDetails vào dependency array

    if (!movieDetails) {
        return (
            <div className="p-10">
                <p className="text-4xl text-white font-bold underline">Loading...</p>
            </div>
        );
    }

    return (
        <div className="relative h-fit w-full">
            <div className="relative">
                <img src={imagepath + movieDetails.backdrop_path} className="opacity-20 w-full aspect-[7/4] object-center" alt="" />
            </div>
            <div className="absolute top-0 w-full pb-[100px]">
                <div className="w-[90%] mx-auto mt-[500px]">
                    <div className="flex text-white gap-4">
                        <img src={imagepath + movieDetails.poster_path} className="w-[350px] h-fit" alt="" />
                        <div className="">
                            <p className="text-5xl">
                                {movieDetails.original_title}
                                <span className="mx-3 text-4xl">
                                    ({movieDetails.release_date.substring(0, 4)})
                                </span>
                            </p>
                            <div className="text-xl text-slate-300 mt-2">
                                <p>{movieDetails.tagline}</p>
                                <p>{movieDetails.overview}</p>
                                <div className="flex flex-col gap-3 mt-4 text-zinc-300">
                                    <p>
                                        Genres: {movieDetails.genres.map(genre => genre.name).join(", ")}
                                    </p>
                                    <p>Rating: {String(movieDetails.vote_average).substring(0, 3)}</p>
                                    <p>Original Language : {movieDetails.original_language}</p>
                                    <p>Release Date : {movieDetails.release_date}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Trailers movieId={params.id} />
                    <SimilarMovies movieId={params.id} />
                </div>
            </div>
        </div>
    );
}

export default Details;
