import React from 'react';
import './Footer.scss';
import { FaInstagram, FaLinkedin, FaTelegramPlane, FaFacebookF } from 'react-icons/fa';
import logo from "../../assets/logo/collegeMapLogo.png";
import termsandconditions from "../../assets/PDF/Terms&Conditions.pdf";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-grid">
                <div className="footer-section">
                    <img src={logo} alt="CollegeMap Logo" className="footer-logo" />
                </div>

                <div className="footer-section">
                    <h4>CollegeMap</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="Questionaire">Find Your Branch</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>About</h4>
                    <ul>
                        <li><a href="#">IIT News</a></li>
                        <li><a href="/HowItWorks">How We Work?</a></li>
                        <li><a href="/AboutUs">About Us</a></li>
                        <li><a href="/#Team">Our Team</a></li>
                        <li><a href="/Contact-us">Contact Us</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Legal</h4>
                    <ul>
                        <li><a href="/Privacy-Policy">Privacy Policy</a></li>
                        <li><a href="/Terms-and-Conditions">Terms and Conditions</a></li>
                        <li><a href="/Cancellation-and-Refund">Cancellation & Refund</a></li>
                    </ul>
                </div>

                <div className="footer-section social-section">
                    <h4>Follow us</h4>
                    <div className="social-icons">
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><FaLinkedin /></a>
                        <a href="#"><FaTelegramPlane /></a>
                        <a href="#"><FaFacebookF /></a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} CollegeMap. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
