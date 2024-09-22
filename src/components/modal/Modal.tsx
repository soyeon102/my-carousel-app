import styles from "./Modal.module.css";

const Modal = ({ open }: { open: boolean }) => {
  return (
    <div
      className={styles.backdrop}
      style={open ? { display: "block" } : { display: "none" }}
    >
      <div className={styles.container}>Modal</div>
    </div>
  );
};

export default Modal;
