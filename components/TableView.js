"use strict";

import Head from "next/head";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import styles from "../css/table_view.module.css";
import Header from "./Header";
import Table from "./Table";

export default function TableView(props) {
  const [socket, setSocket] = useState();
  const [membersLocation, setmMembersLocation] = useState(props.members.reduce((obj, member, _) => {
    obj[Object.keys(member)[0]] = "HOME";
    return obj;
  }, {}));
  const [membersInClass, setMembersInClass] = useState(props.members.reduce((obj, member, _) => {
    obj[Object.keys(member)[0]] = false;
    return obj;
  }, {}));
  
  useEffect(() => {
    const socket = io();
    socket
      .on("updateMemberLocations", (membersLocation) =>
        setmMembersLocation(membersLocation)
      ) // get current membersLocation status
      .on("updateMembersInClass", (membersInClass) =>
        setMembersInClass(membersInClass)
      )
    setSocket(socket);
    return () => socket.close(); // close this socket when component cleanuped
  }, []);

  return (
    <>
      <Head>
        <title>{`IM Here System - ${props.lab}`}</title>
      </Head>
      <Header message={props.message} isScroll={props.isScroll} />
      <div className={styles.attendance_table_container}>
        <Table
          socket={socket}
          members={props.members.map((e) => Object.keys(e)[0])}
          portraits={Object.assign(...props.members)}
          locations={props.locations.map((e) => Object.keys(e)[0])}
          membersLocation={membersLocation}
          membersInClass={membersInClass}
          message={props.message}
        />
      </div>
    </>
  );
}

import config from "../public/config.json";
export async function getStaticProps() {
  return {
    props: {...config},
  }
}

