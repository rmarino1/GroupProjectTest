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
    const fetchData = async () => {
      try {
        // Fetch the quote
        const quoteResponse = await axios.get("https://api.quotable.io/random");
        setQuote(quoteResponse.data);

        // Fetch three more random quotes to get additional authors
        const additionalQuotesResponse = await axios.all([
          axios.get("https://api.quotable.io/random"),
          axios.get("https://api.quotable.io/random"),
          axios.get("https://api.quotable.io/random"),
        ]);

        // Extract author names from additional quotes
        const additionalAuthors = additionalQuotesResponse.map(
          (response) => response.data.author,
        );

        // Include the correct author's name and additional authors in the options
        setAuthorOptions([quoteResponse.data.author, ...additionalAuthors]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Run the effect only once when the component mounts

  const handleOptionClick = (authorName) => {
    setUserSelection(authorName);
    setIsCorrect(authorName === quote.author);
    setHasUserSelected(true);
  };

  return (
    <div>
      <h2>Quote</h2>
      {loading ? (
        <p>Loading quote...</p>
      ) : (
        <div>
          <p>{quote.content}</p>
          {/* <p>- {quote.author}</p> */}
          <p>Who said this?</p>
          {authorOptions.map((authorName, index) => (
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
              disabled={userSelection !== null} // Disable buttons after user selects an option
            >
              {authorName}
            </button>
          ))}
          {hasUserSelected && (
            <p className={isCorrect ? "correct" : "incorrect"}>
              {isCorrect
                ? "Correct!"
                : `Incorrect. The correct answer was ${quote.author}.`}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Quote;
