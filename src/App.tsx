import React from 'react';
import { Link } from 'react-router-dom';
import smallWaldoImg1 from './img/waldo-img-1-small.jpg';
import smallWaldoImg2 from './img/waldo-img-2-small.jpg';
import smallWaldoImg3 from './img/waldo-img-3-small.jpg';
import leaderboardImg from './img/leaderboard.svg';

function App() {
  return (
    <main className="home">
      <div className="home__game-levels">
        <div className="game-level">
          <h3 className="game-level__text-easy">Easy</h3>
          <Link to="/game/easy">
            <img className="level-img" src={smallWaldoImg2} alt="Easy Img preview" />
          </Link>
        </div>
        <div className="game-level">
          <h3 className="game-level__text-medium">Medium</h3>
          <Link to="/game/medium">
            <img className="level-img" src={smallWaldoImg1} alt="Medium Img preview" />
          </Link>
        </div>
        <div className="game-level">
          <h3 className="game-level__text-hard">Hard</h3>
          <Link to="/game/hard">
            <img className="level-img" src={smallWaldoImg3} alt="Hard Img preview" />
          </Link>
        </div>
      </div>
      <Link to="/leaderboard">
        <div className="home__leaderboard-logo">
          <img className="home__leaderboard-logo-img" src={leaderboardImg} alt="Leaderboard" />
          Leaderboard
        </div>
      </Link>
    </main>
  );
}

export default App;
