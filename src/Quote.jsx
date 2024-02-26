import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css"; // Import your existing styles.css file

const Quote = () => {
  const [quote, setQuote] = useState({});
  const [authorOptions, setAuthorOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userSelection, setUserSelection] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [hasUserSelected, setHasUserSelected] = useState(false);

  useEffect(() => {
    fetchData();
  }, []); // Run the effect only once when the component mounts

  const fetchData = async () => {
    setLoading(true);
    try {
      const quoteResponse = await axios.get("https://api.quotable.io/random");
      setQuote(quoteResponse.data);

      const additionalQuotesResponse = await axios.all([
        axios.get("https://api.quotable.io/random"),
        axios.get("https://api.quotable.io/random"),
        axios.get("https://api.quotable.io/random"),
      ]);

      const additionalAuthors = additionalQuotesResponse.map(
        (response) => response.data.author,
      );

      const allOptions = [quoteResponse.data.author, ...additionalAuthors];
      setAuthorOptions(shuffleArray(allOptions));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const handleOptionClick = (authorName) => {
    setUserSelection(authorName);
    setIsCorrect(authorName === quote.author);
    setHasUserSelected(true);
  };

  const handleNextQuestion = () => {
    // Reset state for the next question
    setUserSelection(null);
    setIsCorrect(null);
    setHasUserSelected(false);

    // Fetch a new quote and update options
    fetchData();
  };

  const renderOptions = () => {
    return authorOptions.map((authorName, index) => (
      <button
        key={index}
        onClick={() => handleOptionClick(authorName)}
        className={
          hasUserSelected
            ? authorName === quote.author
              ? "correct"
              : "incorrect"
            : ""
        }
        disabled={userSelection !== null}
      >
        {authorName}
      </button>
    ));
  };

  const renderFeedback = () => {
    return (
      <div>
        <p className={isCorrect ? "correct" : "incorrect"}>
          {isCorrect
            ? "Correct!"
            : `Incorrect. The correct answer was ${quote.author}.`}
        </p>
        <button onClick={handleNextQuestion}>Next Question</button>
      </div>
    );
  };

  return (
    <div>
      <h2>Quote</h2>
      {loading ? (
        <p>Loading quote...</p>
      ) : (
        <div>
          <p>{quote.content}</p>
          <p>Who said this?</p>
          {renderOptions()}
          {hasUserSelected && renderFeedback()}
        </div>
      )}
    </div>
  );
};

export default Quote;
