"use strict";
import styles from "../css/table_view.module.css";
import Abator from "./Abator";
import ClassToggleButton from "./ClassToggleButton";
import LocationButton from "./LocationButton";

/*────────── draw table cells of each member and each location ──────────*/
export default function TableMain(props) {
  return (
    <>
      {props.members.map((member, index) => {
        return (
          <tr className={styles.members_row} key={index}>
            <th className={styles.member_name}>
              <span>{member}</span>
            </th>
            {props.locations.map((location, jndex) => {
              return location === props.membersLocation[member] ? (
                <Abator src={props.portraits[member]} key={jndex} />
              ) : location === "CLASS" ? (
                <ClassToggleButton member={member} key={jndex} {...props} />
              ) : (
                <LocationButton
                  member={member}
                  location={location}
                  key={jndex}
                  {...props}
                />
              );
            })}
          </tr>
        );
      })}
    </>
  );
}
