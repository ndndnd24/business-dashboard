import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import { Loader } from "@mantine/core";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenResponse = await axios.get(
          "https://releeve-frontend-test-75a5687f051f.herokuapp.com/token",
          {
            headers: {
              username: process.env.REACT_APP_USERNAME,
              password: process.env.REACT_APP_PASSWORD,
            },
          }
        );
        const token = tokenResponse.data.token;
        const dataResponse = await axios.get(
          "https://releeve-frontend-test-75a5687f051f.herokuapp.com/affairs",
          {
            headers: {
              token: token,
            },
            params: {
              query: `
                query {
                  getData {
                    age
                    gender
                    affairs
                    yearsmarried
                    children
                    religiousness
                    education
                    occupation
                    rating
                  }
                }
              `,
            },
          }
        );
        console.log(dataResponse.data.data.getData);
        setData(dataResponse.data.data.getData);
        setLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {!isLoaded ? (
        <div className="loader-container">
          <Loader variant="bars" color="#E08D79" />
          <p>Endpoint loading...</p>
        </div>
      ) : (
        data && <div className="test-loaded">endpoint loaded</div>
      )}
    </div>
  );
}

export default App;
