import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useSessionCheck = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const jwt = localStorage.getItem("jwt"); // Get JWT from local storage

        if (!jwt) {
            navigate("/MobileLogin"); // Redirect to login if no JWT
            return;
        }

        const checkSession = async () => {
            try {
                // Uncomment to use real API
                // const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/session`, { method: "GET", headers: { "Authorization": `Bearer ${jwt}` } });

                // Dummy API for testing
                const response = await fetch("/dummy-api/session");

                if (!response.ok) {
                    localStorage.removeItem("jwt"); // Remove invalid JWT
                    navigate("/MobileLogin");
                    return;
                }

                const user = await response.json();

                if (!user.paid) {
                    navigate("/payment"); // Redirect unpaid users to payment page
                }
            } catch (error) {
                console.error("Error checking session:", error);
                navigate("/MobileLogin");
            }
        };

        checkSession();
    }, []);
};

export default useSessionCheck;
