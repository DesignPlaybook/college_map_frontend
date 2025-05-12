import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);  // Scroll to the top whenever route changes
    }, [pathname]);

    return null;
};

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <ScrollToTop /> {/* Ensure scroll resets on route change */}
            <Navbar />
            <main className="flex-grow overflow-auto">{children}</main> {/* Allow content to scroll */}
            <Footer /> {/* Footer stays at the bottom */}
        </div>
    );
};

export default Layout;
