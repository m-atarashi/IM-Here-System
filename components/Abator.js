"use strict";
import Image from "next/image";
import styles from "../css/table_view.module.css";

export default function Abator(props) {
  return (
    <td className={styles.image_cell}>
      <div className={styles.member_avatar}>
        <Image
          className={styles.member_avatar}
          src={props.portraits[props.member]}
          layout="fill"
          objectFit="cover"
        />
      </div>
    </td>
  );
}
