import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../App";

import Logo from "../../assets/images/what-i-read-logo.png";
import { Signout } from "../../containers/auth/firebase-config";
import "./navigation.scss";

const Link = styled.li`
  cursor: pointer;
`;

export const Navbar = (props) => {
  const userData = useContext(UserContext);

  return (
    <section className="navigation">
      <div className="nav-container">
        <div className="brand">
          <a href="#!">
            <img src={Logo} alt="W" />{" "}
          </a>
        </div>
        <nav>
          <div className="nav-mobile">
            <a id="navbar-toggle" href="#!">
              <span></span>
            </a>
          </div>
          <ul className="nav-list">
            <li>
              <a href="#!">Home</a>
            </li>
            <li>
              <a href="#!">About</a>
            </li>
            <li>
              <a href="#!">Services</a>
              <ul className="navbar-dropdown">
                <li>
                  <a href="#!">Sass</a>
                </li>
                <li>
                  <a href="#!">Less</a>
                </li>
                <li>
                  <a href="#!">Stylus</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#!">Portfolio</a>
            </li>
            <li>
              <a href="#!">Category</a>
              <ul className="navbar-dropdown">
                <li>
                  <a href="#!">Sass</a>
                </li>
                <li>
                  <a href="#!">Less</a>
                </li>
                <li>
                  <a href="#!">Stylus</a>
                </li>
              </ul>
            </li>
            <Link>
              {userData.email ? (
                <p onClick={Signout}>Signout</p>
              ) : (
                <p>Signin</p>
              )}
            </Link>
          </ul>
        </nav>
      </div>
    </section>
  );
};
