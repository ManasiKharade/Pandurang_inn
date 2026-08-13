import { useEffect, useState } from "react";
import "./DiningSlider.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function DiningSlider({ images }) {

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        setCurrentIndex(0);
    }, [images]);

    useEffect(() => {

        if (!images || images.length === 0) return;

        const interval = setInterval(() => {

            setCurrentIndex((prev) =>
                prev === images.length - 1 ? 0 : prev + 1
            );

        }, 4000);

        return () => clearInterval(interval);

    }, [images]);

    if (!images || images.length === 0) {

        return (
            <div className="dining-slider-empty">
                No Images Available
            </div>
        );

    }

    const nextSlide = () => {

        setCurrentIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );

    };

    const prevSlide = () => {

        setCurrentIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );

    };

    return (

        <div className="dining-slider">

            <div className="dining-slider-main">

                <button
                    className="slider-arrow left"
                    onClick={prevSlide}
                >
                    <FaChevronLeft />
                </button>

                <img
                    src={images[currentIndex]}
                    alt="Dining"
                    className="dining-main-image"
                />

                <button
                    className="slider-arrow right"
                    onClick={nextSlide}
                >
                    <FaChevronRight />
                </button>

            </div>
        </div>

    );

}

export default DiningSlider;