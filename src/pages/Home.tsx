import styles from "./Home.module.css";

import { useState } from "react";
import Carousel from "../components/carousel/Carousel";
import Gallery from "../components/gallery/Gallery";
import Modal from "../components/modal/Modal";

const Home = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <Carousel />
      <Gallery />
      {isOpen && <Modal open={isOpen} />}
    </div>
  );
};

export default Home;
