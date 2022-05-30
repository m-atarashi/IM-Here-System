'use strict'
import styles from '../css/table_view.module.css'

/*────────── draw a headr row like MEM., HOME, FUN, ... ──────────*/
export default function TableHeader(props) {
  return (
    <thead>
      <tr>
        <th>MEM.</th>
        {props.locations.map(location => <th className={styles.location}><span>{location}</span></th>)}
      </tr>
    </thead>
  )
}