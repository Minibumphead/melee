import React from "react";
import styles from './ScoringButton.module.css'

export default function ScoringButton({ name, value, handleClick, player }) {

  return (

    <button className={styles.root} onClick={(e) => handleClick(e, player)} value={value}>
      {name}
    </button>)

}