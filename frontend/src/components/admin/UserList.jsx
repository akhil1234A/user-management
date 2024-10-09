import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogout } from '../../slices/adminSlice';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.admin);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('http://localhost:3000/api/admin', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, [token]);

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:3000/api/admin/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      setUsers(users.filter((user) => user._id !== id));
    } else {
      alert('Failed to delete user');
    }
  };

  return (
    <div className="container">
      <h2>User List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleDelete(user._id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
