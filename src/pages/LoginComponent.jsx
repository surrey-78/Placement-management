import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../LoginSignUp.css';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const emailHandler = (event) => setEmail(event.target.value);
  const passwordHandler = (event) => setPassword(event.target.value);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`http://localhost:3500/api/v1/login`, {
        email,
        password,
      });

      if (response.status === 201) {
        alert(`Welcome ${response.data.firstName} ${response.data.lastName}!`);
        sessionStorage.setItem('token', response.data.token);
        window.location.href = '/userdata';
      }
    } catch (error) {
      alert(
        `Error: ${error.response?.status} - ${error.response?.data?.message || 'Login failed'}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Login</h1>
      <form onSubmit={formSubmitHandler}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email address"
            value={email}
            onChange={emailHandler}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={passwordHandler}
            required
          />
        </div>

        <div className="mb-3 d-flex justify-content-between">
          <div className="form-check">
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me? <input type="checkbox" className="form-check-input" id="rememberMe" />
              <a href="#" className="text-primary">Forgot Password?</a>
            </label>
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Submit'}
          </button>
        </div>

        <p className="mt-3 text-center">
          New User? <Link to="/signup">Register here!</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginComponent;
