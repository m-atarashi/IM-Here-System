'use strict'
import styles from '../css/table_view.module.css'

export default function Abator(props) {
  return (
    <td className={styles.image_cell}>
      <img className={styles.member_avatar} src={props.portraits[props.member]}/>
    </td> 
  )
}