'use strict'

import Head from 'next/head'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import styles from '../css/table_view.module.css'
import Header from './Header'
import Table from './Table'

export default function TableView(props) {
  const [socket, setSocket] = useState()
  const [membersLocation, setmMembersLocation] = useState([])
  const [membersInClass, setMembersInClass] = useState({})
  const [lab, setLab] = useState()
  const [members, setMembers] = useState([])
  const [locations, setLocations] = useState([])
  const [portraits, setPortraits] = useState({})
  const [message, setMessage] = useState()
  const [isScroll, setisScroll] = useState()
  
  useEffect(() => {
    const socket = io()
    socket
      .on('updateMemberLocations', membersLocation => setmMembersLocation(membersLocation)) // get current membersLocation status
      .on('updateMembersInClass', membersInClass => setMembersInClass(membersInClass))
      .on('sendConfig', config => { // get config and set lab name, members, locations, portraits
        setLab(config.lab)
        setMembers(Object.keys(config.members))
        setLocations(config.locations.map(e => Object.keys(e)[0]))
        setPortraits(config.members)
        setMessage(config.message)
        setisScroll(config.isScroll)
      })
    setSocket(socket)
    return () => socket.close() // close this socket when component cleanuped
  }, [])
  
  return (
    <>
      <Head>
        <title>IM Here System - {lab}</title>
      </Head>
      <Header message={message} isScroll={isScroll}/>
      <div className={styles.attendance_table_container}>
        <Table socket={socket} members={members} locations={locations} portraits={portraits} membersLocation={membersLocation} membersInClass={membersInClass}/>
      </div>
    </>
  )
}