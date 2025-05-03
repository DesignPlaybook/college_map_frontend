import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.scss";
import logo from "../../assets/logo/collegeMapLogo.png";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/MobileLogin");
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/">
                    <img className="logo" src={logo} alt="logo" />
                </Link>
            </div>

            <div className="navbar-right">
                <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
                    <li><Link to="/HowItWorks">How It Works?</Link></li>
                    <li><Link to="/Our-Team">Our Team</Link></li>
                    <li><Link to="#">IIT Updates</Link></li>
                    <li><Link to="/AboutUs">About Us</Link></li>
                    <li><Link to="/Contact-Us">Contact Us</Link></li>
                    {isLoggedIn ? (
                        <button className="cta logout" onClick={handleLogout}>Sign Out</button>
                    ) : (
                        <Link to="/MobileLogin" className="cta">Login</Link>
                    )}
                </div>

                <div className="nav-actions">
                    <Link to="/Questionaire" className="cta">Try Now!</Link>

                    <div className={`hamburger ${isMenuOpen ? "open" : ""}`} onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
