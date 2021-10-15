import React, { useContext } from "react";
import Footer from "./components/footer/Footer";
import Header from "./components/headers/Header";
import MainPages from "./components/mainpages/Pages";
import { GlobalState } from "./GlobalState";

function App() {
  //Global state
  const state = useContext(GlobalState);
  // Night Mode Api
  const [night, setNight] = state.nightModeApi.nightMode;

  return (
    <div className={`App bg-light ${ night && 'bgNightBody '}`}>
      <Header />
      <MainPages />
      <Footer />
    </div>
  );
}

export default App;
