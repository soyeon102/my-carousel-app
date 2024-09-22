import styles from "./Home.module.css";

import { useEffect, useState } from "react";
import Carousel from "../components/carousel/Carousel";
import Gallery from "../components/gallery/Gallery";
import Modal from "../components/modal/Modal";

import { CAROUSEL_IMAGE_COUNT } from "../constant/common";
import { ImageProps } from "../types/ImageType";

const Home = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [carouselImages, setCarouselImages] = useState<ImageProps[]>([]);
  const [galleryImages, setGalleryImages] = useState<ImageProps[]>([]);

  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/random/?client_id=${
            import.meta.env.VITE_ACCESS_KEY
          }&count=30`
        );
        const result = (await response.json()) as [];

        setCarouselImages(result.slice(0, CAROUSEL_IMAGE_COUNT));
        setGalleryImages(result.slice(CAROUSEL_IMAGE_COUNT));
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  // console.log("carouselImages", carouselImages);
  // console.log("galleryImages", galleryImages);

  return (
    <div className={styles.container}>
      <Carousel images={carouselImages} />
      <Gallery images={galleryImages} />
      {isOpen && <Modal open={isOpen} close={handleClose} />}
    </div>
  );
};

export default Home;
