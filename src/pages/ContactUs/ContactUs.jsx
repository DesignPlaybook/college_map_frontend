import React from "react";
import "./ContactUs.scss";


export default function Contact() {
    return (
        <section className="contact-page">
            <div className="contact-header">
                <img
                    src="https://cdn.pixabay.com/photo/2016/03/31/19/56/bird-1297414_960_720.png"
                    alt="Cute bird"
                    className="illustration"
                />
                <h1>Let’s Connect 📨</h1>
                <p>We’re here to help, or just chat about cute stuff.</p>
            </div>

            <form className="contact-form">
                <label>
                    Name
                    <input type="text" placeholder="Your lovely name" required />
                </label>

                <label>
                    Email
                    <input type="email" placeholder="you@example.com" required />
                </label>

                <label>
                    Message
                    <textarea placeholder="What’s on your mind?" required />
                </label>

                <button type="submit">Send Message 💌</button>
            </form>

            <div className="footer-illustration">
                <img
                    src="https://cdn.pixabay.com/photo/2021/01/03/20/25/bunny-5884618_960_720.png"
                    alt="Cute bunny"
                />
            </div>
        </section>
    );
}
