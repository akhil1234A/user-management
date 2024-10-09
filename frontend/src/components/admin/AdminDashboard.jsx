import React from 'react';
import UserList from './UserList';
import AddUser from './AddUser';

const AdminDashboard = () => {
  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <AddUser />
      <UserList />
    </div>
  );
};

export default AdminDashboard;
