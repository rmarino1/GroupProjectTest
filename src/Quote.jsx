import React, { useEffect, useState } from "react";
import axios from "axios";

const Quote = () => {
  const [quote, setQuote] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.quotable.io/random");
        setQuote(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
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
        </div>
      )}
    </div>
  );
};

export default Quote;
