import { useEffect, useState } from "react";

import styles from "./Home.module.css";
import Carousel from "../components/carousel/Carousel";
import Gallery from "../components/gallery/Gallery";
import Modal from "../components/modal/Modal";

import { CAROUSEL_IMAGE_COUNT } from "../constant/common";
import { ImageProps } from "../types/ImageType";

const Home = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [images, setImages] = useState<ImageProps[]>([]);

  const [selectedImage, setSelectedImage] = useState<ImageProps | null>(null);

  const handleClose = () => setIsOpen(false);

  const handleSelectedImage = (item: ImageProps) => {
    setIsOpen(true);
    setSelectedImage(item);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/random/?client_id=${
            import.meta.env.VITE_ACCESS_KEY
          }&count=30`
        );
        const result = (await response.json()) as [];

        setImages(result);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Carousel images={images.slice(0, CAROUSEL_IMAGE_COUNT)} />
      <Gallery
        images={images.slice(CAROUSEL_IMAGE_COUNT)}
        setSelectedImage={handleSelectedImage}
      />
      {isOpen && selectedImage && (
        <Modal open={isOpen} close={handleClose} image={selectedImage} />
      )}
    </div>
  );
};

export default Home;
