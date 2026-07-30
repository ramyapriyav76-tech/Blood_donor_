import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        try {
          setUser(JSON.parse(userInfo));
          // Refresh user profile details from backend
          const { data } = await api.get('/auth/profile');
          if (data.success) {
            const updatedUser = {
              ...JSON.parse(userInfo),
              role: data.role,
              profilePic: data.profilePic,
              name: data.name,
              email: data.email,
              donorProfile: data.donorProfile,
            };
            setUser(updatedUser);
            localStorage.setItem('userInfo', JSON.stringify(updatedUser));
          }
        } catch (error) {
          console.error('Session expired or connection failed');
          // If 401 unauthorized, log out
          if (error.response && error.response.status === 401) {
            logout();
          }
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const { data } = await api.post('/auth/login', { email, password });
      
      if (data.success) {
        // Fetch full profile info to get the donor profile mapping
        const profileRes = await api.get('/auth/profile', {
          headers: { Authorization: `Bearer ${data.token}` }
        });
        
        const fullUser = {
          ...data,
          donorProfile: profileRes.data.donorProfile || null
        };

        setUser(fullUser);
        localStorage.setItem('userInfo', JSON.stringify(fullUser));
        toast.success(`Welcome back, ${data.name}!`);
        return true;
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed. Please check credentials.';
      toast.error(msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, role) => {
    try {
      setLoading(true);
      const { data } = await api.post('/auth/register', { name, email, password, role });
      
      if (data.success) {
        setUser(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
        toast.success(`Account created! Welcome ${data.name}`);
        return true;
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Registration failed';
      toast.error(msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const { data } = await api.put('/auth/profile', profileData);
      if (data.success) {
        const currentUser = JSON.parse(localStorage.getItem('userInfo'));
        const updatedUser = {
          ...currentUser,
          name: data.name,
          email: data.email,
          profilePic: data.profilePic,
          role: data.role,
          donorProfile: data.donorProfile,
        };
        setUser(updatedUser);
        localStorage.setItem('userInfo', JSON.stringify(updatedUser));
        toast.success('Profile updated successfully!');
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
    toast.success('Logged out successfully.');
  };

  const refreshDonorProfile = async () => {
    try {
      const { data } = await api.get('/auth/profile');
      if (data.success) {
        const currentUser = JSON.parse(localStorage.getItem('userInfo'));
        const updatedUser = {
          ...currentUser,
          role: data.role,
          donorProfile: data.donorProfile,
        };
        setUser(updatedUser);
        localStorage.setItem('userInfo', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Failed to refresh donor profile', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile, refreshDonorProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
