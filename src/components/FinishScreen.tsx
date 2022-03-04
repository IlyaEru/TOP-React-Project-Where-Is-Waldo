/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import db from './utils/firebase';

interface Time {
    minutes: number;
  seconds: number;
  difficulty: string;
}

export default function FinishScreen({ minutes, seconds, difficulty }: Time) {
  const navigate = useNavigate();
  const handleScoreSubmit = async () => {
    const nameInput = (document.querySelector('#name-input')as HTMLInputElement).value;
    if (nameInput.trim() === '') {
      return;
    }
    if (seconds < 10) {
      try {
        await addDoc(collection(db, difficulty), {
          name: nameInput,
          time: Number(`${minutes}.0${seconds}`),
        });
      } catch (error) {
        console.error('Error writing new message to Firebase Database', error);
      }
    } else {
      try {
        await addDoc(collection(db, difficulty), {
          name: nameInput,
          time: Number(`${minutes}.${seconds}`),
        });
      } catch (error) {
        console.error('Error writing new message to Firebase Database', error);
      }
    }

    navigate('/leaderboard');
  };
  return (
    <div className="finish-screen">
      <div className="finish-screen__content">
        <div className="finish-screen__content-header">
          <h3>
            You have finished in
            {' '}
            {minutes > 9 ? minutes : `0${minutes}`}
            :
            {seconds > 9 ? seconds : `0${seconds}`}
            !
          </h3>
        </div>
        <div className="finish-screen__content-name">
          Enter your name to save in the Leaderboard
          <div className="input">
            <input placeholder=" " type="text" id="name-input" />
            <label htmlFor="name-input">Name</label>
          </div>
        </div>
        <div className="finish-screen__content-bts">
          <Link to="/"><button className="btn cancel-btn" type="button">Cancel</button></Link>
          <button onClick={handleScoreSubmit} className="btn submit-btn" type="button">Submit</button>
        </div>
      </div>
    </div>
  );
}
