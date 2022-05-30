'use strict'
import styles from '../css/table_view.module.css'

export default function Header(props) {
  return (
    <header className={styles.header}>
      <div className={styles.table_title}>
        <span>IM Here System</span>
        <div className={styles.underline}></div>
      </div>
    </header>
  )
}