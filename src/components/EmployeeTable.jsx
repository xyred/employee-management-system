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
        // Point to the local Spring Boot backend API
        // It's good practice to use environment variables for API endpoints
        const API_ENDPOINT = import.meta.env.VITE_API_URL || "http://localhost:8080/api/employees";

        const response = await fetch(API_ENDPOINT);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const employeesData = await response.json();
        setEmployees(employeesData);
      } catch (e) {
        // More robust error handling
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred";
        setError(errorMessage);
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
