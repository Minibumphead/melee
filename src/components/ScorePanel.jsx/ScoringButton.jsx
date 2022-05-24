import React, { useState } from "react";
import styles from './ScoringButton.module.css'

export default function ScoringButton({ name, value, handleClick, player }) {

  const multiplePressButtons = ['0', 'Fault', 'Drop', 'Undo']

  const setDisabled = () => {
    if (multiplePressButtons.indexOf(name) >= 0) {
      return false
    } else if (player.scores.indexOf(name) !== -1) {
      return true
    }

  }

  return (

    <button
      className={styles.root}
      name={name}
      onClick={(e) => handleClick(e, player)}
      value={value}
      disabled={setDisabled()}
    >
      {name}
    </button>)

}