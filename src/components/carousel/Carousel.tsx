import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Carousel.module.css";

import RightIcon from "../../assets/icons/right-arrow.svg?react";
import LeftIcon from "../../assets/icons/left-arrow.svg?react";

import { ImageProps } from "../../types/ImageType";

const Carousel = ({
  images,
  setSelectedImage,
}: {
  images: ImageProps[];
  setSelectedImage: (item: ImageProps) => void;
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const carouselRef = useRef<HTMLUListElement>(null);

  const handleClickLeft = useCallback(() => {
    setSelectedIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images]);

  const handleClickRight = useCallback(() => {
    setSelectedIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();

    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startX;

    if (deltaX > 100) {
      handleClickLeft();
      setIsDragging(false);
    } else if (deltaX < -100) {
      handleClickRight();
      setIsDragging(false);
    }
  };

  useEffect(() => {
    const imageInterval = setInterval(() => {
      handleClickRight();
    }, 5000);

    return () => clearInterval(imageInterval);
  }, [handleClickRight]);

  return (
    <div className={styles.container}>
      <ul
        className={styles.imageContainer}
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {images.map((image, index) => {
          const isActive = selectedIndex === index;
          const isPrev =
            (selectedIndex - 1 + images.length) % images.length === index;
          let transformStyle = "translateX(100%)";

          if (isActive) {
            transformStyle = "translateX(0)";
          } else if (isPrev) {
            transformStyle = "translateX(-100%)";
          }

          return (
            <li
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className={`${styles.image} ${isActive && styles.show}`}
              style={{
                transform: transformStyle,
              }}
            >
              <img src={image.urls.small} alt={image.alt_description} />
            </li>
          );
        })}
      </ul>

      <button
        className={`${styles.button} ${styles.left}`}
        onClick={handleClickLeft}
      >
        <LeftIcon />
      </button>
      <button
        className={`${styles.button} ${styles.right}`}
        onClick={handleClickRight}
      >
        <RightIcon />
      </button>

      <ul className={styles.dotContainer}>
        {images.map((image, index) => (
          <li
            key={image.id}
            className={`${styles.dot} ${
              selectedIndex === index && styles.active
            }`}
          ></li>
        ))}
      </ul>
    </div>
  );
};

export default Carousel;
