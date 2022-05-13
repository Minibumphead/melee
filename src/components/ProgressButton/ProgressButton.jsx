import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom'
import styles from './ProgressButton.module.css'
import SessionContext from "../../contexts/sessionContext";

export default function ProgressButton({
  matchId,
  setMatchId,
  throwCountPlayerOne,
  throwCountPlayerTwo,
  throwCountPartnerOne,
  throwCountPartnerTwo,
}) {

  const navigate = useNavigate()
  const [session, setSession] = useContext(SessionContext)


  const startMatch = () => {
  }

  const endSession = () => {
    navigate('/view_result')
  }

  const handleNext = () => {
    if (matchId.current === 3 || matchId.current === 7) {
      setMatchId(prevId => {
        return { current: prevId.current + 2 }
      })

    } else {
      setMatchId(prevId => {
        return { current: prevId.current + 1 }
      })
    }
    throwCountPlayerOne.current = 0
    throwCountPlayerTwo.current = 0
    throwCountPartnerOne.current = 0
    throwCountPartnerTwo.current = 0
    // if (session.status === "READY_FOR_NEXT") {
    //   if (matchId.current < 8) {
    //     if (matchId.current === 3 || matchId.current === 7) {
    //       setMatchId(prevId => {
    //         return { current: prevId.current + 2 }
    //       })

    //     } else {
    //       setMatchId(prevId => {
    //         return { current: prevId.current + 1 }
    //       })

    //     }
    //   }
    //   throwCountPlayerOne.current = 0
    //   throwCountPlayerTwo.current = 0
    // } else if (session.status === "HALFTIME") {
    //   throwCountPlayerOne.current = 0
    //   throwCountPlayerTwo.current = 0
    //   alert('halftime')
    // } else if (session.status === "FINISHED") {
    //   alert('Session completed')

    // } else {
    //   alert("Not Ready for next match")
    // }

  }
  const handlePrev = () => {
    if (matchId.current > 1) {
      if (matchId.current === 5 || matchId.current === 9) {
        setMatchId(prevId => {
          return { current: prevId.current - 2 }
        })
      } else {
        setMatchId(prevId => {
          return { current: prevId.current - 1 }
        })
      }

    }
    throwCountPlayerOne.current = 5
    throwCountPlayerTwo.current = 5
  }



  return (
    <>
      <button className={styles.next} onClick={() => console.log(matchId.current)}>print matchID</button>
      <button className={styles.next} onClick={() => handleNext()}>Next</button>
      <button className={styles.next} onClick={() => handlePrev()}>Back</button>
      <button className={styles.next} onClick={() => console.log(session)}>Log Session</button>


      <button className={styles.root} onClick={() => {
        console.log(localStorage.clear())
      }}>clear local storage</button>
    </>)
}