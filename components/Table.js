'use strict'
import styles from '../css/table_view.module.css'
import TableHeader from './TableHeader'
import TableMain from './TableMain'

const top = 40 + 16 + 47.48

export default function Table(props) {
  return (
    <table className={styles.attendance_table} style={{top: top + (props.message ? 40 : 0) + 'px'}}>
      <TableHeader {...props}/>
      <TableMain {...props}/>
    </table>
  )
}