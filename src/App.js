import React from "react";
import MeleeGame from './pages/MeleeGame/MeleeGame'
import TournamentResult from './pages/TournamentResult/TournamentResult'
import TournamentSetup from "./pages/TournamentResult/TournamentSetup";
import Header from './components/Header/Header'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import styles from './App.css'



const App = () => {

  return (
    <div className={styles.root}>
      <Header />
      <Router>
        <Routes>

          <Route path="/" element={<TournamentSetup />} />
          <Route path="/play_matches" element={<MeleeGame />} />
          <Route path="/view_result" element={<TournamentResult />} />

        </Routes>
      </Router>
    </div>


  )
}

export default App