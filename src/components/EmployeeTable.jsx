import React, { useState, useEffect } from "react";
import EmployeeRow from "./EmployeeRow";
import "./EmployeeTable.css";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        // We are using JSONPlaceholder for mock user data.
        const API_ENDPOINT = "https://jsonplaceholder.typicode.com/users";

        // reqres.in is a mock API and doesn't require authorization.
        const response = await fetch(API_ENDPOINT);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonResponse = await response.json();

        // The API returns an array of users directly.
        // We also map the keys to match what our EmployeeRow component expects.
        const formattedEmployees = jsonResponse.map((user) => ({
          id: user.id,
          firstName: user.name.split(" ")[0],
          lastName: user.name.split(" ").slice(1).join(" "),
          email: user.email,
        }));
        setEmployees(formattedEmployees);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return <div className="loading">Loading employees...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <table className="employee-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <EmployeeRow key={employee.id} employee={employee} />
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
