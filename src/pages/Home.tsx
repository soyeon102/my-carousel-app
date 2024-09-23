import { useEffect, useRef, useState } from "react";

import styles from "./Home.module.css";
import Carousel from "../components/carousel/Carousel";
import Gallery from "../components/gallery/Gallery";
import Modal from "../components/modal/Modal";

import { CAROUSEL_IMAGE_COUNT } from "../constant/common";
import { ImageProps } from "../types/ImageType";

const Home = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [images, setImages] = useState<ImageProps[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<ImageProps | null>(null);

  const pageEndRef = useRef<HTMLDivElement>(null);

  const handleClose = () => setIsOpen(false);

  const handleSelectedImage = (item: ImageProps) => {
    setIsOpen(true);
    setSelectedImage(item);
  };

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.unsplash.com/photos/random/?client_id=${
            import.meta.env.VITE_ACCESS_KEY
          }&count=30&page=${page}`
        );
        const result = (await response.json()) as ImageProps[];
        const filteredImages = result.filter(
          (image) => !images.some((item) => item.id === image.id)
        );
        setImages((prev) => [...prev, ...filteredImages]);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          nextPage();
        }
      },
      { threshold: 1 }
    );

    if (pageEndRef.current) observer.observe(pageEndRef.current);

    return () => {
      if (pageEndRef.current) observer.unobserve(pageEndRef.current);
    };
  }, [loading]);

  return (
    <div className={styles.container}>
      <Carousel images={images.slice(0, CAROUSEL_IMAGE_COUNT)} />
      <Gallery
        images={images.slice(CAROUSEL_IMAGE_COUNT)}
        setSelectedImage={handleSelectedImage}
        isLoading={loading}
      />
      <div ref={pageEndRef}></div>
      {isOpen && selectedImage && (
        <Modal open={isOpen} close={handleClose} image={selectedImage} />
      )}
    </div>
  );
};

export default Home;
