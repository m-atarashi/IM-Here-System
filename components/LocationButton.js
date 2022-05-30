'use strict'
import styles from '../css/table_view.module.css'

export default function LocationButton(props) {
  return (
    <td className={styles.button_cell}>
      <button className={styles.attendance_table_button} type='button'
              onClick={() => {props.socket.emit('memberMoved', props.member, props.location)}}>
      </button>
    </td>
  )
}