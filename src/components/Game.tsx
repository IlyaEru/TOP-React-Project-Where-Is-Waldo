/* eslint-disable jsx-a11y/role-has-required-aria-props */
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import mediumWaldoImg from '../img/waldo-img-1-full.jpg';
import easyWaldoImg from '../img/waldo-img-2-full.jpg';
import hardWaldoImg from '../img/waldo-img-3-full.jpg';
import zoomOutImg from '../img/zoom-out.svg';
import wizardImg from '../img/wizard.png';
import zoomInImg from '../img/zoom-in.svg';
import odlawImg from '../img/odlaw.png';
import waldoImg from '../img/waldo.png';
import homeImg from '../img/home.svg';
import db from './utils/firebase';

export default function Game() {
  const [activeClick, setActiveClick] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [clickCoordinates, setClickCoordinates] = useState({ x: 0, y: 0 });
  const [characters, setCharacters] = useState({
    odlaw: { isFound: false },
    waldo: { isFound: false },
    wizard: { isFound: false },
  });

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (seconds === 59) {
        setMinutes(minutes + 1);
        setSeconds(0);
      } else {
        setSeconds(seconds + 1);
      }
    }, 1000);
    return () => {
      clearInterval(timerInterval);
    };
  });

  useEffect(() => {
    const charName = Object.keys(characters);
    if (charName.find((char) => characters[char].isFound === false) === undefined) {
      console.log('finished');
    }
  }, [characters]);

  const handleImgClick = (e: React.MouseEvent<HTMLElement>) => {
    const node = e.currentTarget as HTMLElement;
    const rect = node.getBoundingClientRect();
    const imgWidth = (e.currentTarget as HTMLTextAreaElement).offsetWidth;
    const imgHeight = (e.currentTarget as HTMLTextAreaElement).offsetHeight;
    const x = e.clientX - rect.left; // x position within the img.
    const y = e.clientY - rect.top; // y position within the img.
    const relativeX:number = (x / imgWidth) * 100;
    const relativeY:number = (y / imgHeight) * 100;
    setClickCoordinates({ x: e.pageX, y: e.pageY });
    const target: HTMLElement = document.querySelector('.target')!;
    const targetList: HTMLElement = document.querySelector('.target-list')!;
    if (activeClick === false) {
      setCoordinates({ x: relativeX, y: relativeY });
      setActiveClick(true);
      target.style.display = 'block';
      targetList.style.display = 'block';
      target.style.top = `calc(${e.pageY}px - 1.5rem)`;
      target.style.left = `calc(${e.pageX}px - 1.5rem)`;
      targetList.style.left = `calc(${e.pageX}px + 2rem)`;
      targetList.style.top = `calc(${e.pageY}px - 2rem)`;
    } else {
      target.style.display = 'none';
      targetList.style.display = 'none';
      setActiveClick(false);
    }
  };
interface Params {
  difficulty?: string;
}
const params:Params = useParams();
let imgSrc:string;
if (params.difficulty === 'easy') {
  imgSrc = easyWaldoImg;
} else if (params.difficulty === 'medium') {
  imgSrc = mediumWaldoImg;
} else {
  imgSrc = hardWaldoImg;
}
const handleInformationBox = (correct: string) => {
  const target: HTMLElement = document.querySelector('.target')!;
  const targetList: HTMLElement = document.querySelector('.target-list')!;
  target.style.display = 'none';
  targetList.style.display = 'none';
  setActiveClick(false);

  const infoBox: HTMLElement = document.querySelector('.information-box');
  if (correct === 'yes') {
    infoBox.style.display = 'block';
    infoBox.style.top = `${clickCoordinates.y - 100}px`;
    infoBox.style.left = `${clickCoordinates.x}px`;
    infoBox.textContent = 'Correct!';
    infoBox.style.background = '#a3f1a3bd';
    setTimeout(() => {
      infoBox.style.display = 'none';
    }, 3000);
  } else {
    infoBox.style.display = 'block';
    infoBox.style.top = `${clickCoordinates.y - 100}px`;
    infoBox.style.left = `${clickCoordinates.x}px`;
    infoBox.textContent = 'Nope!';
    infoBox.style.background = '#fb7171b5';
    setTimeout(() => {
      infoBox.style.display = 'none';
    }, 3000);
  }
};
const handleTargetClick = async (targetName: string) => {
  const data = doc(db, 'location', params.difficulty);
  const docSnap = await getDoc(data);
  if (docSnap.exists()) {
    const locationData = docSnap.data()[targetName];
    if (coordinates.x - 2 < locationData.x && coordinates.x + 2 > locationData.x) {
      if (coordinates.y - 3 < locationData.y && coordinates.y + 4 > locationData.y) {
        const stateCopy = characters;
        stateCopy[targetName].isFound = true;
        setCharacters({ ...stateCopy });
        handleInformationBox('yes');
      } else {
        handleInformationBox('no');
      }
    } else {
      handleInformationBox('no');
    }
  } else {
  // doc.data() will be undefined in this case
    console.log('No such document!');
  }
};
const handleZoomIn = () => {
  const waldoMainImg: HTMLElement = document.querySelector('.game-img');
  const currentWidth:number = Number((getComputedStyle(waldoMainImg).width).split('px')[0]);
  waldoMainImg.style.width = `${currentWidth * 1.1}px`;
};
const handleZoomOut = () => {
  const waldoMainImg: HTMLElement = document.querySelector('.game-img');
  const currentWidth:number = Number((getComputedStyle(waldoMainImg).width).split('px')[0]);
  waldoMainImg.style.width = `${currentWidth * 0.9}px`;
};
return (
  <main className="game">
    <div className="game-header">
      <ul className="game-header__img-list">
        <li className={characters.waldo.isFound ? 'is-found' : ''}>
          <img className="game-header__img" src={waldoImg} alt="Waldo" />
          Waldo
        </li>
        <li className={characters.wizard.isFound ? 'is-found' : ''}>
          <img className="game-header__img" src={wizardImg} alt="Wizard" />
          Wizard
        </li>
        <li className={characters.odlaw.isFound ? 'is-found' : ''}>
          <img className="game-header__img" src={odlawImg} alt="Odlaw" />
          Odlaw
        </li>
      </ul>
      <div className="timer">
        {minutes > 9 ? minutes : `0${minutes}`}
        :
        {seconds > 9 ? seconds : `0${seconds}`}

      </div>
      <div className="zoom-btns">
        <button title="Zoom in" onClick={handleZoomIn} type="button"><img className="zoom-img zoom-in" src={zoomInImg} alt="Zoom in" /></button>
        <button title="Zoom out" onClick={handleZoomOut} type="button"><img className="zoom-img zoom-out" src={zoomOutImg} alt="Zoom Out" /></button>
      </div>
      <Link to="/"><img title="Home Page" className="game-header__home-btn" src={homeImg} alt="Home Page" /></Link>
    </div>
    <div className="game-img-wrapper">
      <div className="information-box" />
      <div className="target" />
      <div className="target-list">
        <ul>
          <li
            className={characters.waldo.isFound ? 'is-found' : ''}
            role="option"
            onKeyDown={() => { handleTargetClick('waldo'); }}
            onClick={() => { handleTargetClick('waldo'); }}
          >
            <img className="target-list__img" src={waldoImg} alt="Waldo" />
            Waldo
          </li>
          <li
            className={characters.wizard.isFound ? 'is-found' : ''}
            role="option"
            onKeyDown={() => { handleTargetClick('wizard'); }}
            onClick={() => { handleTargetClick('wizard'); }}
          >
            <img className="target-list__img" src={wizardImg} alt="Wizard" />
            Wizard
          </li>
          <li
            className={characters.odlaw.isFound ? 'is-found' : ''}
            role="option"
            onKeyDown={() => { handleTargetClick('odlaw'); }}
            onClick={() => { handleTargetClick('odlaw'); }}
          >
            <img className="target-list__img" src={odlawImg} alt="Odlaw" />
            Odlaw
          </li>
        </ul>
      </div>
      <img className="game-img" role="presentation" onClick={handleImgClick} src={imgSrc} alt="where's waldo" />
    </div>
  </main>
);
}
