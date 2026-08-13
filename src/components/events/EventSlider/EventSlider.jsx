import { useEffect, useState } from "react";
import "./EventSlider.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function EventSlider({ images }) {

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

            <div className="slider-empty">

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

        <div className="slider">

            <div className="slider-main">

                <button
                    className="arrow left"
                    onClick={prevSlide}
                >
                    <FaChevronLeft />
                </button>

                <img
                    src={images[currentIndex]}
                    alt="Event"
                    className="main-image"
                />

                <button
                    className="arrow right"
                    onClick={nextSlide}
                >
                    <FaChevronRight />
                </button>

            </div>

            <div className="thumbnail-container">

                {images.map((image, index) => (

                    <img
                        key={index}
                        src={image}
                        alt=""
                        className={
                            currentIndex === index
                                ? "thumbnail active"
                                : "thumbnail"
                        }
                        onClick={() => setCurrentIndex(index)}
                    />

                ))}

            </div>

        </div>

    );

}

export default EventSlider;