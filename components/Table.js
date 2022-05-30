'use strict'
import styles from '../css/table_view.module.css'
import TableHeader from './TableHeader'
import TableMain from './TableMain'

export default function Table(props) {
  return (
    <table className={styles.attendance_table}>
      <TableHeader {...props}/>
      <TableMain {...props}/>
    </table>
  )
}