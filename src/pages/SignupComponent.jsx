import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../LoginSignUp.css';

const SignupComponent = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const inputHandler = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`http://localhost:3500/api/v1/signup`, userData);

      if (response.status === 201) {
        alert(`Account created successfully for ${response.data.firstName} ${response.data.lastName}!`);
        window.location.href = '/login';
      }
    } catch (error) {
      alert(
        `Error: ${error.response?.status} - ${error.response?.data?.message || 'Signup failed'}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Sign Up</h1>
      <form onSubmit={formSubmitHandler}>
        <div className="mb-3">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            placeholder="Enter your first name"
            value={userData.firstName}
            onChange={inputHandler}
            required
          />
        </div>

        <div className="mb-3">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            placeholder="Enter your last name"
            value={userData.lastName}
            onChange={inputHandler}
            required
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter your email address"
            value={userData.email}
            onChange={inputHandler}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter your password"
            value={userData.password}
            onChange={inputHandler}
            required
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Signing up...' : 'Submit'}
          </button>
        </div>

        <p className="mt-3 text-center">
          Already registered? <Link to="/login">Sign in here!</Link>
        </p>
      </form>
    </div>
  );
};

export default SignupComponent;
