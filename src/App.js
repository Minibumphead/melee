import React from "react";
import MeleeGame from './pages/MeleeGame/MeleeGame'
// import TournamentResult from './pages/TournamentResult/TournamentResult'
import Result from './pages/TournamentResult/Result'
import TournamentSetup from "./pages/TournamentSetup/TournamentSetup";
import Header from './components/Header/Header'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import styles from './App.css'
import SessionContext from "./contexts/sessionContext";


const App = () => {
  return (
    <div className={styles.root}>
      {/* <Header /> */}
      <Router>
        <Routes>

          <Route path="/" element={<TournamentSetup />} />
          <Route path="/play_matches" element={<MeleeGame />} />
          <Route path="/view_result" element={<Result />} />

        </Routes>
      </Router>
    </div>


  )
}

export default App