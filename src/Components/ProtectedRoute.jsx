// src/Components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const isAuthenticated = localStorage.getItem('token');  // Memeriksa apakah token ada di localStorage

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;  // Jika tidak ada token, arahkan ke login
};

export default ProtectedRoute;

