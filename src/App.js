import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [tab, setTab] = useState(true);

  const handleReset = () => {
    setQuotes([])
  }
    useEffect(() => {
      return () => {
        console.log('Show A se démonte')
        handleReset()
      }
    }, [tab])
  
  /* appel API sur les boutons left et right*/
  function getQuotes() {
    // Send the request
    axios
      .get("https://simpsons-quotes-api.herokuapp.com/quotes?count=2")
      // Extract the DATA from the received response
      .then((response) => response.data)
      // Use this data to update the state
      .then((data) => {
        console.log(data);
        setQuotes(data);
      });
  }

  useEffect(() => {
    getQuotes();
  }, []);

  function DisplayQuotes({ quotes }) {
    return (
      <div>
        <button type="button" onClick={getQuotes} handleReset={handleReset}>
          Get quotes
        </button>
        {quotes &&
          quotes.map((el, id) => (
            <div key={id}>
              <img src={el.image} alt="" />
              <ul>
                <li>{el.quote}</li>
                <li>{el.character}</li>
                <li>{el.characterDirection}</li>
              </ul>
            </div>
          ))}
      </div>
    );
  }
  return (
    <div className="App">
      <button onClick={() => setTab(!tab)}> Switch Tab</button>
      <div className="grid">
        <div className="left">
          {tab ? <DisplayQuotes quotes={quotes} /> : null}
        </div>

        <div className="right">
          {tab ? null : <DisplayQuotes quotes={quotes} />}
        </div>
      </div>
    </div>
  );
}

export default App;
