import { useState, useEffect } from "react";
import { baseApi } from "../../api/axiosInstance";

function Trailers({ movieId }) {
    const [trailers, setTrailers] = useState([]);
    const [error, setError] = useState(null);

    // Fetch trailers ngay khi component được mount hoặc movieId thay đổi
    useEffect(() => {
        const fetchTrailers = async () => {
            try {
                const response = await baseApi.get(`/3/movie/${movieId}/videos?language=en-US`);
                const trailerObj = response.data.results.filter(data => data.type === "Trailer");
                setTrailers(trailerObj);
            } catch (err) {
                console.error("Fetch trailer error", err);
                setError("Failed to fetch trailers. Please try again later.");
            }
        };

        if (movieId) {
            fetchTrailers();
        }
    }, [movieId]); // Chạy lại khi movieId thay đổi

    return (
        <div className="mt-16 text-white">
            <p className="text-3xl font-bold text-yellow-500 mb-4">Watch Trailers</p>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            <div className="flex flex-wrap w-full gap-4">
                {trailers.length > 0 ? (
                    trailers.map(trailer => (
                        <div key={trailer.key} className="">
                            <iframe
                                width="380"
                                height="200"
                                src={`https://www.youtube.com/embed/${trailer.key}`}
                                title={trailer.name}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                            <p className="font-bold mb-2 text-xl">{trailer.name}</p>
                        </div>
                    ))
                ) : (
                    !error && <p className="text-gray-400">No trailers available for this movie.</p>
                )}
            </div>
        </div>
    );
}

export default Trailers;
