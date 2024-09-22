import styles from "./Gallery.module.css";
import { ImageProps } from "../../types/ImageType";

const Gallery = ({
  images,
  setSelectedImage,
}: {
  images: ImageProps[];
  setSelectedImage: (item: ImageProps) => void;
}) => {
  return (
    <div className={styles.container}>
      <ul className={styles.imageContainer}>
        {images.map((image: ImageProps) => (
          <li
            key={image.id}
            className={styles.image}
            onClick={() => setSelectedImage(image)}
          >
            <img src={image.urls.small} alt={image.alt_description} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Gallery;
