import React from "react";

const EmployeeRow = ({ employee }) => {
    return (
        <tr>
            <td>{employee.id}</td>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>{employee.email}</td>
        </tr>
    );
};

export default EmployeeRow;