import React, { useState } from 'react';
import './ContactUs.scss';
import ContactIllustration from '../../assets/contact-illustration.svg';

const ContactUs = () => {
    const [showPopup, setShowPopup] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const subject = e.target.subject.value;
        const message = e.target.message.value;

        // Google Form URL and entry keys
        const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfILAk2c9t9AofhWDlWT4sKM2Wx4deaTD-lpipkAnLFd6kzGA/formResponse";

        const form = document.createElement("form");
        form.action = formUrl;
        form.method = "POST";
        form.target = "hidden_iframe"; // Prevent navigation
        form.style.display = "none";

        // Map inputs to Google Form entry IDs
        const data = {
            "entry.1917690449": name,
            "entry.363307104": email,
            "entry.904682142": subject,
            "entry.585560953": message,
        };

        Object.entries(data).forEach(([key, value]) => {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = value;
            form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);

        // Show your thank-you popup
        setShowPopup(true);
        e.target.reset(); // Reset your custom form
        setTimeout(() => setShowPopup(false), 3000);
    };

    return (
        <>
            <iframe name="hidden_iframe" style={{ display: "none" }}></iframe>

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
        </>
    );
};

export default ContactUs;
