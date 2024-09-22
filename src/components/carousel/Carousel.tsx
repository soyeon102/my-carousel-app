import styles from "./Carousel.module.css";
import leftArrow from "/icons/left-arrow.svg";
import rightArrow from "/icons/right-arrow.svg";

const Carousel = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}></div>

      <button className={`${styles.button} ${styles.left}`}>
        <img src={leftArrow} alt="left" />
      </button>
      <button className={`${styles.button} ${styles.right}`}>
        <img src={rightArrow} alt="right" />
      </button>

      <ul className={styles.dotContainer}>
        <li className={`${styles.dot} ${styles.active}`}></li>
        <li className={`${styles.dot}`}></li>
        <li className={`${styles.dot}`}></li>
        <li className={`${styles.dot}`}></li>
        <li className={`${styles.dot}`}></li>
      </ul>
    </div>
  );
};

export default Carousel;
