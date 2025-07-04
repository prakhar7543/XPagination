import React, { useEffect, useState } from "react";
import "./employeeDataTable.css";

export default function EmployeeDataTable() {
  let [data, setData] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);

  let itemsPerPage = 10;

  const isDataReady = data.length > 0;


  let lastItemIndex = currentPage * itemsPerPage;
  let firstItemIndex = lastItemIndex - itemsPerPage;
  let currentEmployees = data.slice(firstItemIndex, lastItemIndex);

  let totalPages = data.length > 0 ? Math.ceil(data.length / itemsPerPage) : 0;

  let numberOfPages = [];
  for (let i = 1; i <= totalPages; i++) {
    numberOfPages.push(i);
  }

  let fetchData = async () => {
    let url =
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

    try {
      let res = await fetch(url);
      let data = await res.json();
      console.log("fetched Data", data);
      setData(data);
      setCurrentPage(1);
    } catch (error) {
      console.error("failed to fetch data");
      alert("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Employee Data Table</h1>
      <div className="dataTable">
        <table border="0" cellPadding="10" cellSpacing="1">
          <thead>
            <tr style={{ backgroundColor: "#009978", color: "white" }}>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: "lightgrey" }}>
            {currentEmployees &&
              currentEmployees.map((details, index) => (
                <tr key={index}>
                  <td>{details.id}</td>
                  <td>{details.name}</td>
                  <td>{details.email}</td>
                  <td>{details.role}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div
          className="btn"
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={!isDataReady || currentPage === 1}
            style={{ backgroundColor: "#009978", color: "white" }}
          >
            Previous
          </button>

          <span
            className="displayPageNumber"
            data-testid="current-page"
            style={{
              backgroundColor: "#009978",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              fontSize: "larger",
              fontWeight: "500",
              width: "40px",
              height: "40px",
            }}
          >
            {currentPage}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={!isDataReady || currentPage === totalPages}
            style={{ backgroundColor: "#009978", color: "white" }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
