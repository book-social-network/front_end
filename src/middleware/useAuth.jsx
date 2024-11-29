import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = ({requiredRole, userRole}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (userRole !== requiredRole) {
            navigate("/"); 
        }
    }, [requiredRole, userRole]);
};