import React from "react";
import styles from './ReadyIndicator.module.css'
import { STATUS_OPTIONS } from "../../data";

export default function ReadyIndicator({ status }) {
  return (
    <div>
      {
        status === STATUS_OPTIONS[0] || status === STATUS_OPTIONS[1] ?
          <div className={status === STATUS_OPTIONS[0] ? styles.root : styles.ready} >
            {status === STATUS_OPTIONS[0] ? "select Throwers" : "Ready"}
          </div> : "Test"
      }
    </div>
  )
}