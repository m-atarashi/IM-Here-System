'use strict'
import styles from '../css/table_view.module.css'

export default function Message(props) {
  return (
    <div className={styles.message_container}>
      {[''].map(() => {
        return(
          props.message === '' ?
            <span></span> :
          props.isScroll ?
          /* 5 has no means */
            [...Array(5)].map(() => <span className={`${styles.message} ${styles.scroll}`}>{props.message}</span>):
            <span className={styles.message}>{props.message}</span>
        )})
      }
    </div>
  )
}