import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const AddUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { token } = useSelector((state) => state.admin);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/api/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      alert('User created successfully');
    } else {
      alert('Failed to create user');
    }
  };

  return (
    <div className="container">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
