import React from "react";
import MeleeGame from './pages/MeleeGame/MeleeGame'
import Header from './components/Header/Header'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import styles from './App.css'



const App = () => {

  return (
    <div className={styles.root}>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<MeleeGame />} />
        </Routes>
      </Router>
    </div>


  )
}

export default App