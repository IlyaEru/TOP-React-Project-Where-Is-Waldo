import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Header from './components/Header';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';

export default function RouteSwitch() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={(
            <>
              <Header />
              <App />
            </>
            )}
        />
        <Route
          path="/leaderboard"
          element={(
            <>
              <Header />
              <Leaderboard />
            </>
            )}
        />
        <Route path="game/:difficulty" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}
