

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Input, Button, Form, message } from "antd";
// import './EditEmployee.css';  // Import your CSS file for custom styling

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const navigate = useNavigate();

  // Fetch employee data from the backend using axios
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/employees/${id}`)
      .then((response) => {
        setEmployee(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setDepartment(response.data.department);
      })
      .catch((error) => console.error("Error fetching employee:", error));
  }, [id]);

  // Handle form submission
  const handleSubmit = (values) => {
    const updatedEmployee = { ...values };

    axios
      .put(`http://localhost:5000/api/employees/${id}`, updatedEmployee)
      .then(() => {
        message.success("Employee updated successfully");
        navigate("/");  // Navigate back to the list page
      })
      .catch((error) => {
        message.error("Error updating employee");
        console.error("Error updating employee:", error);
      });
  };

  return (
    <div className="edit-employee-container">
      <h2>Edit Employee</h2>
      <Form
        name="edit-employee"
        initialValues={{
          name: name,
          email: email,
          phone: phone,
          department: department,
        }}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input the employee's name!" }]}
        >
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please input the employee's email!" },
            { type: "email", message: "The input is not valid E-mail!" },
          ]}
        >
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone"
          rules={[{ required: true, message: "Please input the employee's phone number!" }]}
        >
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
          />
        </Form.Item>

        <Form.Item
          name="department"
          label="Department"
          rules={[{ required: true, message: "Please input the employee's department!" }]}
        >
          <Input
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Enter department"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Update Employee
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditEmployee;
