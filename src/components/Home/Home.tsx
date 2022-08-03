import React from 'react';
import { useNavigate } from 'react-router-dom';

import { logOut } from '../../api';
import Logo from '../Logo/Logo';
import './Home.scss';

export function Home() {
  const navigate = useNavigate();
  const handlerOnClick = async () => {
    const response = await logOut();

    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    } else {
      navigate('/auth/login', { replace: true });
    }
  };

  return (
    <section className="home">
      <Logo />
      <img
        alt="congratulation"
        className="home__congratmainimg"
        src="../../images/congrat.png"
      />

      <p className="home__congrattext">Now you are on the main page. Soon we will provide you with detailed feedback on the result of your work</p>
      <button
        type="button"
        className="home__button home__button--congrat"
        onClick={() => {
          handlerOnClick();
        }}
      >
        <span className="home__buttonname">See you</span>
      </button>
      <img
        alt="congratulation people"
        className="home__congratpeopleimg"
        src="../../images/people.svg"
      />
    </section>
  );
}
