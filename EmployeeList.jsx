import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react"; // Import AG-Grid
import "ag-grid-community/styles/ag-grid.css"; // AG Grid Styles
import "ag-grid-community/styles/ag-theme-alpine.css"; // AG Grid Alpine Theme

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  // Fetch all employees
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/employees")
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  // Handle delete
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/employees/${id}`)
      .then(() => {
        setEmployees(employees.filter((employee) => employee._id !== id));
      })
      .catch((error) => console.error("Error deleting employee:", error));
  };

  // Navigate to the edit page
  const handleEdit = (id) => {
    navigate(`/edit-employee/${id}`);
  };

  // Define AG-Grid columns
  const columns = [
    { headerName: "Name", field: "name" },
    { headerName: "Email", field: "email" },
    { headerName: "Phone", field: "phone" },
    { headerName: "Department", field: "department" },
    {
      headerName: "Actions",
      cellRenderer: (params) => (
        <div>
          <Button
            size="small"
            onClick={() => handleEdit(params.data._id)}
            style={{ marginRight: 5 }}
            type="primary"
          >
            Edit
          </Button>
          <Button
            size="small"
            onClick={() => handleDelete(params.data._id)}
            type="primary"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee List</h2>
      {/* Button to navigate to the Add Employee page */}
      <Button
        type="primary"
        style={{ marginBottom: "15px" }}
        onClick={() => navigate("/add-employee")}
      >
        Add Employee
      </Button>

      {/* AG-Grid Table */}
      <div
        className="ag-theme-alpine"
        style={{
          height: "400px", // Adjust height as needed
          width: "950px", // Full width for the grid
          marginTop: "20px",
        }}
      >
        <AgGridReact
          columnDefs={columns}
          rowData={employees}
          domLayout="autoHeight" // Automatically adjust grid height
        />
      </div>
    </div>
  );
};

export default EmployeeList;
