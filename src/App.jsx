import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AddEmployee from "../AddEmployee";
import EditEmployee from "../EditEmployee";
import EmployeeList from "../EmployeeList";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/edit-employee/:id" element={<EditEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
