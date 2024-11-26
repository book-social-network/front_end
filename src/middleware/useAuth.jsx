import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = (requiredRole, userRole) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (userRole !== requiredRole) {
            navigate("/"); 
        }
    }, [requiredRole, userRole]);
};

export default useAuth;