import styles from "./Gallery.module.css";
const Gallery = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.imageContainer}>
        <li className={styles.image}></li>
        <li className={styles.image}></li>
        <li className={styles.image}></li>
        <li className={styles.image}></li>
        <li className={styles.image}></li>
        <li className={styles.image}></li>
        <li className={styles.image}></li>
      </ul>
    </div>
  );
};

export default Gallery;
