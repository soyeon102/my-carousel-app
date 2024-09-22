import { useEffect } from "react";
import styles from "./Modal.module.css";
import { ImageProps } from "../../types/ImageType";
import CloseIcon from "../../assets/icons/close.svg?react";

interface ModalProps {
  open: boolean;
  close: () => void;
  image: ImageProps;
}

const Modal = ({ open, close, image }: ModalProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      className={`${styles.backdrop} ${open && styles.show}`}
      onClick={() => close()}
    >
      <div
        className={styles.container}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <img src={image.urls.regular} alt={image.alt_description} />
        <button className={styles.close} onClick={() => close()}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export default Modal;
