import React, { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import "./App.scss";

import { Navbar } from "./components/navigation";
import AppRouter from "./containers/router";

const UserContext = React.createContext();

const App = () => {
  const [currUser, setCurrUser] = useState("");

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrUser(user);
    } else {
      setCurrUser("");
    }
  });

  return (
    <div className="App dark-theme">
      <UserContext.Provider value={currUser}>
        <header className="App-header">
          <Navbar />
        </header>
        <main>
          <AppRouter />
        </main>
      </UserContext.Provider>
    </div>
  );
};

export { UserContext };
export default App;
