import { useEffect, useState } from "react";
import "./GallerySlider.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function GallerySlider({ images }) {

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {

        setCurrentIndex(0);

    }, [images]);

    useEffect(() => {

        if (!images || images.length === 0) return;

        const interval = setInterval(() => {

            setCurrentIndex(prev =>
                prev === images.length - 1 ? 0 : prev + 1
            );

        }, 4000);

        return () => clearInterval(interval);

    }, [images]);

    if (!images || images.length === 0) {

        return (

            <div className="gallery-empty">

                No Images Available

            </div>

        );

    }

    const nextSlide = () => {

        setCurrentIndex(prev =>
            prev === images.length - 1 ? 0 : prev + 1
        );

    };

    const prevSlide = () => {

        setCurrentIndex(prev =>
            prev === 0 ? images.length - 1 : prev - 1
        );

    };

    return (

        <div className="gallery-slider">

            <div className="gallery-main">

                <button
                    className="gallery-arrow gallery-left"
                    onClick={prevSlide}
                >
                    <FaChevronLeft />
                </button>

                <img
                    src={images[currentIndex]}
                    alt=""
                    className="gallery-image"
                />

                <button
                    className="gallery-arrow gallery-right"
                    onClick={nextSlide}
                >
                    <FaChevronRight />
                </button>

            </div>

            

        </div>

    );

}

export default GallerySlider;