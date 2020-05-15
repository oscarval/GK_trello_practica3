import React from "react";
import "./Footer.scss";

const Footer = (props) => {
  return (
    <div className='Footer'>
      <div className='footer-container-1'>
        <div className='column'>Author: Alexis Valdez</div>
        <div className='column'>GeeksHubs Practice 3</div>
        <div className='column'>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://github.com/oscarval/GK_trello_practica3'>
            Github
          </a>
        </div>
      </div>
      <div className='footer-container-2'></div>
    </div>
  );
};

export default Footer;
