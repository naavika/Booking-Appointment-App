import React, { useState, useEffect } from "react";
import "../styles/BookingAppointmentPageStyles.css";
import { Form, Input, message, Modal } from 'antd';
import axios from 'axios';

const BookingAppointmentPage = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // Store the user being edited
  const [editModalVisible, setEditModalVisible] = useState(false); // State for modal visibility

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/v1/user/users');
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const onFinishHandler = async (values) => {
    try {
      const res = await axios.post('/api/v1/user/bookingappointmentpage', values);
      if (res.data.success) {
        message.success('Appointment booked successfully!');
        fetchUsers();
      }
    } catch(error) {
      console.log(error);
      message.error('Something went wrong');
    }
  };

  const onDeleteUser = async (id) => {
    try {
      const res = await axios.delete(`/api/v1/user/users/${id}`);
      if (res.data.success) {
        message.success('User deleted successfully!');
        fetchUsers();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const onEditUser = (user) => {
    setEditingUser(null); // Clear previous user data first
    setTimeout(() => { // Allow UI to refresh
      setEditingUser(user);
      setEditModalVisible(true);
    }, 0);
  };

  const onEditModalClose = () => {
    setEditModalVisible(false);
    setEditingUser(null);
  };

  const onFinishEdit = async (values) => {
    try {
      const res = await axios.put(`/api/v1/user/users/${editingUser.id}`, values);
      if (res.data.success) {
        message.success('User updated successfully!');
        setEditModalVisible(false);
        fetchUsers();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
      <div className="form-container">
        <Form layout="vertical" onFinish={onFinishHandler} className="booking-appointment-app">
          <h3>BOOKING APPOINTMENT APP</h3>
          <Form.Item label="UserName" name="username">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Phone Number" name="phonenumber">
            <Input type="tel" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <button className="btn btn-primary" type="submit">Submit</button>
        </Form>
      </div>

      <div>
        <h2>User List</h2>
        <table>
          <thead>
            <tr>
              <th>UserName</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.phonenumber}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => onDeleteUser(user.id)}>Delete</button>
                  <button onClick={() => onEditUser(user)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        title="Edit User"
        visible={editModalVisible}
        onCancel={onEditModalClose}
        footer={null}
      >
        {editingUser && (
          <Form layout="vertical" onFinish={onFinishEdit} initialValues={editingUser} key={editingUser.id}>
            <Form.Item label="Username" name="username">
              <Input />
            </Form.Item>
            <Form.Item label="Phone Number" name="phonenumber">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <button className="btn btn-primary" type="submit">Update</button>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default BookingAppointmentPage;

