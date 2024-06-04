import PropTypes from 'prop-types';
import useAuth from "../hooks/useAuth"
import { Navigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()

    if (loading) {
        return <LoadingSpinner />
    }

    if (user) {
        return children
    }

    return <Navigate to={'/login'} />
}

PrivateRoute.propTypes = {
    children: PropTypes.node,
}

export default PrivateRoute