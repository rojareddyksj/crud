

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd"; // Import AntD components

const AddEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const newEmployee = { name: values.name, email: values.email, phone: values.phone, department: values.department };

    axios
      .post("http://localhost:5000/api/employees", newEmployee)
      .then(() => {
        navigate("/"); // Navigate back to the employee list page after successful addition
      })
      .catch((error) => console.error("Error adding employee:", error));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Employee</h2>
      <Form
        name="addEmployee"
        onFinish={handleSubmit}
        layout="vertical"
      >
        {/* Name Input */}
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input the name!" }]}
        >
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>

        {/* Email Input */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input the email!" },
            { type: "email", message: "The input is not a valid E-mail!" },
          ]}
        >
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>

        {/* Phone Input */}
        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Please input the phone number!" }]}
        >
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </Form.Item>

        {/* Department Input */}
        <Form.Item
          label="Department"
          name="department"
          rules={[{ required: true, message: "Please input the department!" }]}
        >
          <Input value={department} onChange={(e) => setDepartment(e.target.value)} />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Add Employee
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddEmployee;


