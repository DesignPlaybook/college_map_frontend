import React, { useState } from 'react';
import './ContactUs.scss';
import ContactIllustration from '../../assets/contact-illustration.svg';

const ContactUs = () => {
    const [showPopup, setShowPopup] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowPopup(true);
        e.target.reset(); // clear form

        // Optional: auto-close the popup after 3 seconds
        setTimeout(() => setShowPopup(false), 3000);
    };

    return (
        <div className="contact-us">
            {showPopup && (
                <div className="contact-us__popup">
                    <div className="contact-us__popup-content">
                        <p>Thank you for reaching out to us! We will get back to you shortly. 💌</p>
                    </div>
                </div>
            )}

            <div className="contact-us__container">
                <div className="contact-us__info">
                    <img
                        src={ContactIllustration}
                        alt="Contact Us Illustration"
                        className="contact-us__illustration"
                    />
                    <h2 className="contact-us__heading">Get in Touch</h2>
                    <p className="contact-us__text">
                        We'd love to hear from you! Feel free to reach out with any questions, feedback, or collaboration opportunities.
                    </p>
                    <div className="contact-us__details">
                        <div className="contact-us__detail-item">
                            <i className="fas fa-map-marker-alt"></i>
                        </div>
                        <div className="contact-us__detail-item">
                            <i className="fas fa-envelope"></i>
                            <a href="mailto:info@example.com">support@collegemap.in </a>
                        </div>
                        <div className="contact-us__detail-item">
                            <i className="fas fa-phone"></i>
                            <a href="tel:+911234567890">+91-9326602765</a>
                        </div>
                    </div>
                </div>

                <div className="contact-us__form-wrapper">
                    <h3 className="contact-us__form-heading">Send us a Message</h3>
                    <form className="contact-us__form" onSubmit={handleSubmit}>
                        <div className="contact-us__form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" required />
                        </div>
                        <div className="contact-us__form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required />
                        </div>
                        <div className="contact-us__form-group">
                            <label htmlFor="subject">Subject</label>
                            <input type="text" id="subject" name="subject" />
                        </div>
                        <div className="contact-us__form-group contact-us__form-group--textarea">
                            <label htmlFor="message">Message</label>
                            <textarea id="message" name="message" rows="5" required></textarea>
                        </div>
                        <button type="submit" className="contact-us__form__button">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
