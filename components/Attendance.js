'use strict'

import Head from 'next/head'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import styles from '../css/attendance.module.css'

export default function Attendance(props) {
  const [socket, setSocket] = useState()
  const [membersLocation, setmMembersLocation] = useState([])
  const [lab, setLab] = useState()
  const [members, setMembers] = useState([])
  const [locations, setLocations] = useState([])
  const [portraits, setPortraits] = useState({})
  
  useEffect(() => {
    const socket = io()
    socket
      .on('updateMemberLocations', membersLocation => setmMembersLocation(membersLocation)) // get current membersLocation status
      .on('sendConfig', config => { // get config and set lab name, members, locations, portraits
        setLab(config.lab)
        setMembers(Object.keys(config.members))
        setLocations(config.locations.map(e => Object.keys(e)[0]))
        setPortraits(config.members)
      })
    setSocket(socket)
    return () => socket.close() // close this socket when component cleanuped
  }, [])
  
  return (
    <>
      <Head>
        <title>Attendance System - {lab}</title>
        <link rel='icon' href=''/>
      </Head>
      <div className={styles.header}>
        <div className={styles.table_title}>
          <span>Attendance System</span>
          <div className={styles.underline}></div>
        </div>
      </div>
      <div className={styles.attendance_table_container}>
        <table className={styles.attendance_table}>
          <thead>
          {/*────────── draw a headr row like MEMBER, HOME, OUT, FUN, ... ──────────*/}
            <tr>
              <th>MEM.</th>
              {locations.map(location => <th className={styles.location}><span>{location}</span></th>)}
            </tr>
          </thead>
          {/*────────── draw table cells of each member and each location ──────────*/}
          {members.map(member => {
            return (
              <tr className={styles.members_row}>
                <th className={styles.member_name}>
                  <span>{member}</span>
                </th>
                {locations.map(location => {
                  return (
                    location === membersLocation[member] ?  // display member's icon at the current location, otherwise buttons which emits a 'onMoved' event when touched or clicked
                      <td className={styles.image_cell}>
                        <img className={styles.member_avatar} src={portraits[member]}/>
                      </td> :
                      <td className={styles.button_cell}>
                        <button className={styles.attendance_table_button} type='button' onClick={() => {socket.emit('memberMoved', member, location)}}></button>
                      </td>
                  )
                })}
              </tr>
            )
          })}
        </table>
      </div>
    </>
  )
}
