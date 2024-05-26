import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoutes({ children }) {
    const isLoggedIn = useSelector((state) => state.auth.token);

    useEffect(() => {
        if (!isLoggedIn) {
            window.location.href = '/signin'; // Redirect using window.location for external navigation
        }
    }, [isLoggedIn]);
    return isLoggedIn ? children : null;
}
