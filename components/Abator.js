"use strict";
import styles from "../css/table_view.module.css";

export default function Abator(props) {
  return (
    <td className={styles.image_cell}>
      <div className={styles.member_avatar}>
        <img
          className={styles.member_avatar}
          src={props.src}
        />
      </div>
    </td>
  );
}
