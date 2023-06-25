import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader, Text } from "@mantine/core";
import TableComponent from "./components/Table";
import AgeChart from "./components/AgeChart";
import GenderChart from "./components/GenderChart";
import ChildrenChart from "./components/ChildrenChart";
import ReligiousnessChart from "./components/ReligiousnessChart";
import RatingChart from "./components/RatingChart";
import AffairsChart from "./components/AffairsChart";
import MarriageChart from "./components/MarriageChart";

function App() {
  const [data, setData] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenResponse = await axios.get(process.env.REACT_APP_TOKEN, {
          headers: {
            username: process.env.REACT_APP_USERNAME,
            password: process.env.REACT_APP_PASSWORD,
          },
        });
        const token = tokenResponse.data.token;
        const dataResponse = await axios.get(process.env.REACT_APP_AFFAIRS, {
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
        });
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
          <div className="app-container">
            <Text className="app-title-container">Affairs Dashboard</Text>
            <TableComponent data={data} />
            <AgeChart data={data} />
            <div className="donut-charts-container">
              <GenderChart data={data} />
              <ChildrenChart data={data} />
            </div>
            <AffairsChart data={data} />
            <div className="donut-charts-container">
              <ReligiousnessChart data={data} />
              <RatingChart data={data} />
            </div>
            <MarriageChart data={data} />
          </div>
        )
      )}
    </div>
  );
}

export default App;
