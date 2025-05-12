// Example Route Guard Component
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();
    const isPaid = true; // Replace with actual payment status check

    if (!isLoggedIn) {
        return <Navigate to="/MobileLogin" />;
    }

    if (!isPaid) {
        return <Navigate to="/PaymentRequired" />; // Or display a message
    }

    return children;
};

export default ProtectedRoute;

// In your Router setup:
// <Route path="/EnhancedQuestions" element={<ProtectedRoute><EnhancedQuestions /></ProtectedRoute>} />