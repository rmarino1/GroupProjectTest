import React, { useEffect, useState } from "react";
import axios from "axios";

const Quote = () => {
  const [quote, setQuote] = useState({});
  const [authorOptions, setAuthorOptions] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      <h2>Quote</h2>
      {loading ? (
        <p>Loading quote...</p>
      ) : (
        <div>
          <p>{quote.content}</p>
          <p>- {quote.author}</p>
          <p>Who said this?</p>
          {authorOptions.map((authorName, index) => (
            <button key={index} onClick={() => handleOptionClick(authorName)}>
              {authorName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Quote;
