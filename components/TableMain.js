'use strict'
import styles from '../css/table_view.module.css'
import Abator from './Abator'
import ClassToggleButton from './ClassToggleButton'
import LocationButton from './LocationButton'

/*────────── draw table cells of each member and each location ──────────*/
export default function TableMain(props) {
  return (
  <>
    {props.members.map(member => {
      return (
        <tr className={styles.members_row}>
          <th className={styles.member_name}>
            <span>{member}</span>
          </th>
          {props.locations.map(location => {
            return (
              location === props.membersLocation[member] ?
                <Abator member={member} {...props}/>:
              location === 'CLASS' ?
                <ClassToggleButton member={member} {...props}/> :
                <LocationButton member={member} location={location} {...props}/>
            )
          })}
        </tr>
      )
    })}
  </>
  )
}