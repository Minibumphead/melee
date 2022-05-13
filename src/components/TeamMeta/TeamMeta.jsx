import React, { useState } from "react";
import Lineup from "./Lineup/Lineup";
import styles from './TeamMeta.module.css'


export default function TeamMeta({ team, toggleLineup, dir }) {

  return (
    <div className={styles.root} >

      {toggleLineup && (
        <Lineup players={team.players} dir={dir} />
      )}
      <h2>Team Points: {team.points_sum}</h2>
      <h2>Matches Won: {team.matches_sum}</h2>
    </div>)
}