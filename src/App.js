import "./App.css";
import React, { useEffect, useState } from "react";
import { Loader, Table } from "@mantine/core";
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
        setData(dataResponse.data.data.getData);
        setLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const rows = data.map((element, index) => (
    <tr key={"table-item-" + index}>
      <td>{element.age}</td>
      <td>{element.gender}</td>
      <td>{element.affairs}</td>
      <td>{element.yearsmarried}</td>
      <td>{element.children}</td>
      <td>{element.religiousness}</td>
      <td>{element.education}</td>
      <td>{element.occupation}</td>
      <td>{element.rating}</td>
    </tr>
  ));

  return (
    <div className="App">
      {!isLoaded ? (
        <div className="loader-container">
          <Loader variant="bars" color="#E08D79" />
          <p>Endpoint loading...</p>
        </div>
      ) : (
        data && (
        <div className="table-container">
            <Table highlightOnHover>
              <thead>
                <tr>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Affairs</th>
                  <th>Years Married</th>
                  <th>Children</th>
                  <th>Religiousness</th>
                  <th>Education</th>
                  <th>Occupation</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </div>
        )
      )}
    </div>
  );
}

export default App;
