import React from "react";
import styles from './ProgressButton.module.css'

export default function ProgressButton({ children, status }) {
  console.log(styles)

  const startMatch = () => {
    console.log("start")
  }

  return (
    <button className={styles.root} onClick={() => startMatch()}>
      Start Match
    </button>)
}