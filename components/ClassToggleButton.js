'use strict'
import styles from '../css/table_view.module.css'

export default function TableClassToggleButton(props) {
  return (
    <td className={styles.button_cell}>
      <input id={'class_toggle_' + props.member} className={styles.toggle_button} checked={props.membersInClass[props.member]} type='checkbox'/>
      <label for={'class_toggle_' + props.member} className={styles.toggle_label} 
            onClick={() => {props.socket.emit('classTurned', props.member, props.membersLocation[props.member])}}>
      </label>
    </td>
  )
}