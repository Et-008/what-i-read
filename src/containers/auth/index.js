import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import { GoogleLogin, LoginUser, SignupUser } from "./firebase-config";


const Input = styled.input`
  outline: none;
  padding: 10px 20px;
  margin: 10px auto;
  border: 1px solid #ececec;
  border-radius: 10px;
  background: transparent;
  color: inherit;
`;

const Button = styled.button`
  padding: 6px 16px;
  border: none;
  border-radius: 25px;
`;

const FormContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  height: 100%;

  form {
    display: grid;
    align-items: center;
  }

  span {
    cursor: pointer;
    color: #61dafb;
  }
`;

const Authentication = (props) => {
  const [newUser, setNewUser] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  function handleInput(e) {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { name, email, password, phone } = userData;
    if (newUser) {
      SignupUser(userData);
    } else {
      const data = { name, email, password };
      LoginUser(data);
    }
  }

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <h4>{!newUser ? "Login" : "Signup"}</h4>
        <Input
          type={"text"}
          name="name"
          onChange={handleInput}
          placeholder="name"
          value={userData.name}
          required
        />
        <Input
          type={"email"}
          name="email"
          onChange={handleInput}
          placeholder="email"
          value={userData.email}
          required
        />
        <Input
          type={"password"}
          name="password"
          onChange={handleInput}
          placeholder="password"
          value={userData.password}
          required
        />
        {newUser && (
          <>
            <Input
              type={"number"}
              name="phone"
              onChange={handleInput}
              placeholder="phone"
              value={userData.phone}
            />
          </>
        )}
        <Input type={"submit"} />
      </form>
      <Button onClick={GoogleLogin}>
        <FontAwesomeIcon icon={faGoogle} /> Google Signin
      </Button>
      {!newUser ? (
        <p>
          Don't have an account?{" "}
          <span onClick={() => setNewUser(true)}>Signup</span>
        </p>
      ) : (
        <p>
          Already have an account?{" "}
          <span onClick={() => setNewUser(false)}>Login</span>
        </p>
      )}
    </FormContainer>
  );
};

export default Authentication;
