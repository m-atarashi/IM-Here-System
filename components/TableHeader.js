'use strict'
import styles from '../css/table_view.module.css'

const top = 40 + 16 + 47.48

/*────────── draw a headr row like MEM., HOME, FUN, ... ──────────*/
export default function TableHeader(props) {
  return (
    <thead style={{top: top + (props.message ? 40 : 0) + 'px'}}>
      <tr>
        <th>MEM.</th>
        {props.locations.map(location => <th className={styles.location}><span>{location}</span></th>)}
      </tr>
    </thead>
  )
}