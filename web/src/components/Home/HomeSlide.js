import HomeCarousel from "./HomeCarousel";
import HomeCarouselList from "./HomeCarouselList";

function HomeSlide() {
    return (
        <div className="flex gap-4">
            <div className="w-2/3 relative">
                <HomeCarousel />
            </div>
            <div className="w-1/3">
                <HomeCarouselList />
            </div>
        </div>
    )
}

export default HomeSlide;