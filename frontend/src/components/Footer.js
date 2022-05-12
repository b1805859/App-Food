import React from 'react';
import { Link } from 'react-router-dom';

import Image from '../assets/img/bg.png';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__item">
        <img src={Image} alt="" />
      </div>
      <div className="footer__item">
        <div className="footer__item__card">
          <h2 className="footer__item__card__motton">
            oh yes, we did. the stave pizza, well baked slice of pizza.
          </h2>
        </div>
        <div className="footer__item__card">
          <div className="footer__item__card__title">find our restaurants</div>
          <div className="footer__item__card__text">
            1654 R. Don Road #304.
            <br /> NewYork, 85022
            <br /> (602) 867-1010
          </div>
          <div className="footer__item__card__text">
            2356 K. Laquie Rd #235.
            <br /> NewYork, 85022
            <br /> (602) 867-1011
          </div>
          <div className="footer__item__card__text">
            3245 E. Erwin St #104.
            <br /> NewYork, 85022
            <br /> (602) 867-1012
          </div>
          <div className="footer__item__card__text">
            1504 W. Caroll St #125.
            <br /> NewYork, 85022
            <br /> (602) 867-1013
          </div>
        </div>
        <div className="footer__item__card">
          <div className="footer__item__card__title">working hours</div>
          <div className="footer__item__card__text">
            MONDAY UNTIL FRIDAY
            <br /> 9:00 - 22:00
          </div>
          <div className="footer__item__card__text">
            SATURDAY - SUNDAY
            <br /> 12:00 - 24:00
          </div>
          <div className="footer__item__card__follow">
            <div className="footer__item__card__title">follow us</div>
            <div className="footer__item__card__icons">
              <Link to={'/'}>
                <i class="fab fa-facebook-f footer__item__card__icons__icon"></i>
              </Link>
              <Link to={'/'}>
                <i class="fab fa-instagram footer__item__card__icons__icon"></i>
              </Link>
              <Link to={'/'}>
                <i class="fab fa-twitter footer__item__card__icons__icon"></i>
              </Link>
              <Link to={'/'}>
                <i class="fab fa-youtube footer__item__card__icons__icon"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
