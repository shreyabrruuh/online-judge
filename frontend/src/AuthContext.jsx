import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const Authprovider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [user, setUser] = useState('');

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  useEffect(() => {
    if (isAuthenticated) {
      // Fetch the user data
      const fetchUserData = async () => {
        try {
          const response = await axios.get('https://online-judge-qmoq.onrender.com/user', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          console.log("Role :",response.data.role);
          setUser(response.data._id);
          setUsername(response.data.username);
          setRole(response.data.role);
        } catch (err) {
          console.error('Failed to fetch user data', err);
        }
      };

      fetchUserData();
    }
  }, [isAuthenticated]);



  const API_URL = 'https://online-judge-qmoq.onrender.com';
  const logout = async () => {
    try {
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true }); // Adjust the URL as needed
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setUsername('');
      setRole('');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, username, role, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
