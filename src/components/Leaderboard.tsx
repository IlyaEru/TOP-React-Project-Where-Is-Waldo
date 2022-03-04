import React, { useEffect, useState } from 'react';
import uniqid from 'uniqid';
import { Link } from 'react-router-dom';
import {
  collection, query, getDocs, orderBy,
} from 'firebase/firestore';
import db from './utils/firebase';
import leaderboardImg from '../img/leaderboard.svg';
import smallWaldoImg1 from '../img/waldo-img-1-small.jpg';
import smallWaldoImg2 from '../img/waldo-img-2-small.jpg';
import smallWaldoImg3 from '../img/waldo-img-3-small.jpg';
import homeImg from '../img/home.svg';
import controllerImg from '../img/controller.svg';

export default function Leaderboard() {
  const [activeLevel, setActiveLevel] = useState('easy');
  const [results, setResults] = useState([]);
  useEffect(() => {
    const resultData = [];
    const resultQuery = query(collection(db, activeLevel), orderBy('time', 'asc'));
    getDocs(resultQuery).then((data) => {
      data.forEach((item) => {
        resultData.push(item.data());
      });
    }).then(() => {
      setResults(resultData);
    });
  }, [activeLevel]);
  const handleGameLevelClick = (e) => {
    if (e.currentTarget.classList.contains('active') === false) {
      const levelsDivs = document.querySelectorAll('.game-level');
      levelsDivs.forEach((div) => {
        div.classList.remove('active');
      });
      e.currentTarget.classList.add('active');
      setActiveLevel(e.currentTarget.querySelector('h3').textContent.toLowerCase());
    }
  };
  return (
    <main className="leaderboard">
      <div className="leaderboard__header">
        <img className="leaderboard__header-img" src={leaderboardImg} alt="Leaderboard" />
        Leaderboard
      </div>
      <div className="leaderboard__content">
        <div className="leaderboard__game-levels">
          <div role="button" tabIndex={0} onKeyUp={handleGameLevelClick} onClick={handleGameLevelClick} className="game-level active">
            <h3 className="game-level__text-easy">Easy</h3>
            <img className="level-img" src={smallWaldoImg2} alt="Easy Img preview" />
          </div>
          <div role="button" tabIndex={0} onKeyUp={handleGameLevelClick} onClick={handleGameLevelClick} className="game-level">
            <h3 className="game-level__text-medium">Medium</h3>
            <img className="level-img" src={smallWaldoImg1} alt="Medium Img preview" />
          </div>
          <div role="button" tabIndex={0} onKeyUp={handleGameLevelClick} onClick={handleGameLevelClick} className="game-level">
            <h3 className="game-level__text-hard">Hard</h3>
            <img className="level-img" src={smallWaldoImg3} alt="Hard Img preview" />
          </div>
        </div>
        <div className="leaderboard__results">
          <table className="leaderboard__results-table">
            <thead>
              <tr>
                <th className="table-name-header">Name</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={uniqid()}>
                  <td>{result.name}</td>
                  <td>
                    {result.time.toString().split('.')[0]}
                    :
                    {result.time.toString().split('.')[1]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="leaderboard__content-btns">
          <Link to={`/game/${activeLevel}`}>
            <button className="btn leaderboard__content-game-btn" type="button">
              <img className="leaderboard__game-btn" src={controllerImg} alt="play level" />
              Play this level
            </button>
          </Link>
          <Link to="/">
            <button className="btn leaderboard__content-home-btn" type="button">
              <img title="Home Page" className="leaderboard__home-btn" src={homeImg} alt="Home Page" />
              Home
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
