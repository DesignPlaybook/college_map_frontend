import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const location = useLocation();  // Get current route location

    useEffect(() => {
        window.scrollTo(0, 0);  // Scroll to top when the route changes
    }, [location]);

    return null;
};

export default ScrollToTop;
