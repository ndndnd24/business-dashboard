import "./App.css";
import React, { useEffect, useState } from "react";
import { Loader, Table, Pagination } from "@mantine/core";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [sortedColumn, setSortedColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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

  const handleSort = (column) => {
    if (column === sortedColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortedColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedData = [...data];
  if (sortedColumn) {
    sortedData.sort((a, b) => {
      const valueA = a[sortedColumn];
      const valueB = b[sortedColumn];

      if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
      if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const rows = currentItems.map((element, index) => (
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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

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
            <Table
              highlightOnHover
              stripped
              withBorder
              verticalSpacing="md"
              fontSize="lg"
            >
              <thead>
                <tr>
                  <th onClick={() => handleSort("age")}>
                    Age{" "}
                    {sortedColumn === "age" && (
                      <span>({sortDirection === "asc" ? "↑" : "↓"})</span>
                    )}
                  </th>
                  <th onClick={() => handleSort("gender")}>
                    Gender{" "}
                    {sortedColumn === "gender" && (
                      <span>({sortDirection === "asc" ? "↑" : "↓"})</span>
                    )}
                  </th>
                  <th onClick={() => handleSort("affairs")}>
                    Affairs{" "}
                    {sortedColumn === "affairs" && (
                      <span>({sortDirection === "asc" ? "↑" : "↓"})</span>
                    )}
                  </th>
                  <th onClick={() => handleSort("yearsmarried")}>
                    Years Married{" "}
                    {sortedColumn === "yearsmarried" && (
                      <span>({sortDirection === "asc" ? "↑" : "↓"})</span>
                    )}
                  </th>
                  <th onClick={() => handleSort("children")}>
                    Children{" "}
                    {sortedColumn === "children" && (
                      <span>({sortDirection === "asc" ? "↑" : "↓"})</span>
                    )}
                  </th>
                  <th onClick={() => handleSort("religiousness")}>
                    Religiousness{" "}
                    {sortedColumn === "religiousness" && (
                      <span>({sortDirection === "asc" ? "↑" : "↓"})</span>
                    )}
                  </th>
                  <th onClick={() => handleSort("education")}>
                    Education{" "}
                    {sortedColumn === "education" && (
                      <span>({sortDirection === "asc" ? "↑" : "↓"})</span>
                    )}
                  </th>
                  <th onClick={() => handleSort("occupation")}>
                    Occupation{" "}
                    {sortedColumn === "occupation" && (
                      <span>({sortDirection === "asc" ? "↑" : "↓"})</span>
                    )}
                  </th>
                  <th onClick={() => handleSort("rating")}>
                    Rating{" "}
                    {sortedColumn === "rating" && (
                      <span>({sortDirection === "asc" ? "↑" : "↓"})</span>
                    )}
                  </th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
            <Pagination
              total={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              withBoundaryNumbers
              size="lg"
              rightSectionLimit={1}
              className="pagination-container"
            />
          </div>
        )
      )}
    </div>
  );
}

export default App;
