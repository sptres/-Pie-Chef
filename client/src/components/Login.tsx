import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        { username, password }
      );
      localStorage.setItem('token', response.data.token);
      toast.success('Logged in successfully!');
      setTimeout(() => {
        navigate('/');
        window.location.reload(); // Reload to update navbar state
      }, 1000);
    } catch (error) {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="flex justify-center">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="form-control bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl mb-4 text-black">Login</h2>
        <div className="mb-4">
          <label className="label text-black">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="label text-black">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
