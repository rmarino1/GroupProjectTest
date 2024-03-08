import React, { useEffect, useState } from "react";

import "./styles.css";
import Quote from "./Quote";
import Score from "./Score";

export default function App() {
  const [numCorrect, setNumCorrect] = useState(0);
  const [numAsked, setNumAsked] = useState(0);

  const updateScore = (isCorrect) => {
    setNumAsked(numAsked + 1);
    if (isCorrect) {
      setNumCorrect(numCorrect + 1);
    }
  };

  return (
    <div className="App">
      <h1>Famous Quotes</h1>
      <Score numCorrect={numCorrect} numAsked={numAsked} />
      <Quote updateScore={updateScore} />
    </div>
  );
}
