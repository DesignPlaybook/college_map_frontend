import React from 'react';
import Slider from "react-slick";
import './Testimonials.scss';

const testimonials = [
    {
        title: "Awesome Community",
        quote: "As a chronic procrastinator, this community really helps me motivate myself to get my homework done. Has cool leaderboards, timers, and study tips. It’s a really large community so it’s pretty easy to meet people, too.",
    },
    {
        title: "Productivity Booster",
        quote: "I have never been so focused and productive when studying by myself before. I can study with someone basically 24/7 if I really wanted to. It has been an amazing help! 💜 Thanks Study Together!",
    },
    {
        title: "Goals",
        quote: "I've been a part of it for probably a little over a month and I've noticed how it's improved my ability to stay focused. Since everyone is also studying in the call and working hard, I feel obliged to stay on task as well.",
    },
    {
        title: "Productivity Booster",
        quote: "I have never been so focused and productive when studying by myself before. I can study with someone basically 24/7 if I really wanted to. It has been an amazing help! 💜 Thanks Study Together!",
    },
    {
        title: "Goals",
        quote: "I've been a part of it for probably a little over a month and I've noticed how it's improved my ability to stay focused. Since everyone is also studying in the call and working hard, I feel obliged to stay on task as well.",
    },
    {
        title: "Productivity Booster",
        quote: "I have never been so focused and productive when studying by myself before. I can study with someone basically 24/7 if I really wanted to. It has been an amazing help! 💜 Thanks Study Together!",
    },
    {
        title: "Goals",
        quote: "I've been a part of it for probably a little over a month and I've noticed how it's improved my ability to stay focused. Since everyone is also studying in the call and working hard, I feel obliged to stay on task as well.",
    },
    // Add more if needed
];

const Testimonials = () => {
    const settings = {
        dots: true,
        arrows: false, // Hides arrows
        infinite: testimonials.length > 3,
        speed: 500,
        slidesToShow: testimonials.length < 3 ? testimonials.length : 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000, // 3000ms = 3 seconds per slide

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <section className="testimonials">
            <h2>What Our Students Say</h2>
            <Slider {...settings} className="testimonial-slider">
                {testimonials.map((t, index) => (
                    <div key={index} className="testimonial-card">
                        <h3>{t.title}</h3>
                        <p className="quote">"{t.quote}"</p>
                    </div>
                ))}
            </Slider>
        </section>
    );
};

export default Testimonials;
