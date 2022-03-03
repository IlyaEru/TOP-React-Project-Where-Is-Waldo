import React from 'react';
import waldoIcon from '../img/waldo-icon.png';

export default function Header() {
  return (
    <header>
      <img className="header__waldo-icon" src={waldoIcon} alt="waldo" />
      <h1 className="header__hero">
        <span className="header__text-where">
          Where&apos;s
        </span>
        <br />
        <span className="header__text-waldo">
          Waldo?
        </span>
      </h1>
    </header>
  );
}
