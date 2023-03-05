"use strict";
import styles from "../css/table_view.module.css";

export default function Message(props) {
  return (
    <div className={styles.message_container}>
      {[""].map((element, index) => {
        return props.message === "" ? (
          <span key={index}></span>
        ) : props.isScroll ? (
          /* 5 has no means */
          [...Array(5)].map((element, jndex) => (
            <span className={`${styles.message} ${styles.scroll}`} key={jndex}>
              {props.message}
            </span>
          ))
        ) : (
          <span className={styles.message} key={index}>
            {props.message}
          </span>
        );
      })}
    </div>
  );
}
