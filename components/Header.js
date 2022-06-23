'use strict'
import styles from '../css/table_view.module.css'
import Message from './Message'
import Title from './Title'

export default function Header(props) {
  return (
    <header className={styles.header}>
      <Message {...props}/>
      <Title {...props}/>
    </header>
  )
}