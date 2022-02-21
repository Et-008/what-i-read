import React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import Slide from "react-reveal/Slide";
import { Routes, Route } from "react-router-dom";

import Blog from "../../components/blog";

const Hero = styled.div`
  h1 {
    font-size: 64px;
    line-height: 72px;
    font-weight: 700;
    text-align: center;
    padding: 80px 24px 40px;
  }
`;

const Home = (props) => {
  return (
    <div className="home">
      <Container>
        <Hero>
          <h1>
            <Slide bottom cascade>
              What I Read.io
            </Slide>
          </h1>
        </Hero>
        <Blog />
      </Container>
    </div>
  );
};

export default Home;
