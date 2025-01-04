import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-[#121212] py-2">
            <div className="w-[80%] mx-auto">
                <div className="flex space-x-16">
                    <div className="flex flex-col text-yellow-500">
                        <Link to="/">
                            <h1 className="text-[18px] leading-4">ALLABOUT</h1>
                            <h1 className="text-[24px] leading-5 font-semibold">MOVIES</h1>
                        </Link>

                    </div>
                    <Link to="/movie">
                        <button className="text-[18px] text-yellow-500 hover:underline">
                            EXPLORE
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
