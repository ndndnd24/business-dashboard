import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "@mantine/core";
import TableComponent from "./components/Table";
import AgeChart from "./components/AgeChart";
import GenderChart from "./components/GenderChart";
import ChildrenChart from "./components/ChildrenChart";
import ReligiousnessChart from "./components/ReligiousnessChart";
import RatingChart from "./components/RatingChart";

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
        setData(dataResponse.data.data.getData);
        setLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {!isLoaded ? (
        <div className="loader-container">
          <Loader variant="bars" color="#E08D79" />
          <p>Endpoint loading...</p>
        </div>
      ) : (
        data && (
          <div className="App">
            <TableComponent data={data} isLoaded={isLoaded} />
            <AgeChart data={data} isLoaded={isLoaded} />
            <div className="donut-charts-container">
              <GenderChart data={data} isLoaded={isLoaded} />
              <ChildrenChart data={data} isLoaded={isLoaded} />
            </div>
            <div className="donut-charts-container">
              <ReligiousnessChart data={data} isLoaded={isLoaded} />
              <RatingChart data={data} isLoaded={isLoaded} />
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default App;
