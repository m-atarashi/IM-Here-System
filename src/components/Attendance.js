'use strict'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import styles from '../../assets/css/attendance.css'


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
        setMembers(config.members)
        setLocations(config.locations.map(e => Object.keys(e)[0]))
        setPortraits(config.portraits)
      })
    setSocket(socket)
    return () => socket.close() // close this socket when component cleanuped
  }, [])
  
  return (
    <>
      <Head>
        <title>Where are you? - {lab}</title>
        <link rel='icon' href='../../img/sumi.jpeg'/>
      </Head>

      <h1 align='center'>{lab}</h1>
      <table className='table table-bordered table-striped'>
        <thead className='thead-dark'>
        {/*────────── draw a headr row like MEMBER, HOME, OUT, FUN, ... ──────────*/}
          <tr>
            <th>MEMBER</th>
            {locations.map(location => <th>{location}</th>)}
          </tr>
        </thead>
        {/*────────── draw table cells of each member and each location ──────────*/}
        {members.map(member => {
          return (
            <tr>
              <th>{member}</th>
              {locations.map(location => {
                return (
                  location === membersLocation[member] ?  // display member's icon at the current location, otherwise an empty space which emits a 'onMoved' event when touched or clicked
                    <td><img src={`../../assets/img/${portraits[member]}`}/></td> :
                    // <td><img className='member-avatar' src='https://ca.slack-edge.com/T036R1A1E-U036PT9AT-c927529411ab-512'/></td> :
                    <td><button className='attendance-table-button' type='button' onClick={() => {socket.emit('memberMoved', member, location)}}></button></td>
                )
              })}
            </tr>
          )
        })}
      </table>
      <style jsx>{styles}</style>
    </>
  )
}