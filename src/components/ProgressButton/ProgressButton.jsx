import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom'
import styles from './ProgressButton.module.css'
import SessionContext from "../../contexts/sessionContext";
import hatchetIcon from './../../assets/icons/hatchet.png'

export default function ProgressButton({
  matchId,
  setMatchId,
}) {

  const navigate = useNavigate()
  const [session, setSession] = useContext(SessionContext)



  const endSession = () => {
    setSession(prevSession => ({ ...prevSession, status: "FINISHED" }))
    navigate('/view_result')
  }

  const handleNext = () => {
    if (matchId.current === 3 || matchId.current === 8) {
      setMatchId(prevId => {
        return { current: prevId.current + 2 }
      })

    } else if (matchId.current < 10) {
      setMatchId(prevId => {
        return { current: prevId.current + 1 }
      })
    }


  }
  const handlePrev = () => {
    if (matchId.current > 1) {
      if (matchId.current === 5 || matchId.current === 10) {
        setMatchId(prevId => {
          return { current: prevId.current - 2 }
        })
      } else {
        setMatchId(prevId => {
          return { current: prevId.current - 1 }
        })
      }

    }
  }

  console.log(session.team_one.players[0])

  return (
    <>
      <div className={styles.flex}>
        {matchId.current < 10 &&
          <button className={styles.next} onClick={() => handleNext()}>Next Match <img src={hatchetIcon} /> </button>
        }
        {
          (matchId.current >= 1 && session.team_one.players[0].finished_match) &&
          < button className={styles.next} onClick={() => endSession()}>View Result</button>
        }
        {
          (matchId.current >= 1 && session.team_one.players[0].finished_match) &&
          < button className={styles.next} onClick={() => handlePrev()}>Previous Match</button>
        }
      </div>
    </>)
}

{/* <button className={styles.next} onClick={() => handlePrev()}>Back</button> */ }