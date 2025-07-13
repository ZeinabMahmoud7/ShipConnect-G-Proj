import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Load token & user from localStorage on app load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setUser({ token: storedToken, ...JSON.parse(storedUser) });
    }
  }, []);
function parseJwt(token) {
  try {
    const base64Payload = token.split('.')[1];
    const payload = atob(base64Payload); // decode base64
    return JSON.parse(payload);
  } catch (e) {
    console.error('Invalid token', e);
    return null;
  }
}

  // ✅ Save token/user after login
const login = (apiResponse) => {
  const token = apiResponse.data; // ✅ Extract from `data.data`
  const decodedToken = parseJwt(token); // Optional: if you want to extract user info from token
  const userData = {
    email: decodedToken?.email,
    role: decodedToken?.role,
  };

  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(userData));
  console.log('✅ Stored:', token, userData);
  setUser({ token, ...userData });
};

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
