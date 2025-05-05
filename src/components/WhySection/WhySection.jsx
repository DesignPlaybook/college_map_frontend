import React from 'react';
import './WhySection.scss';
import vision from "../../assets/vision.png";

const features = [
    {
        title: 'Own Study Universe',
        description: 'Create your very own study room with atmospheric backgrounds, personal timers, and goals.',
        image: vision
    },
    {
        title: 'Group Study Rooms',
        description: 'Join motivated students from all over the world to boost your productivity and find your study flow.',
        image: vision
    },
    {
        title: 'Free Tutor Help!',
        description: 'Feeling stuck? Just raise your hand and one of our expert community tutors will jump in and help.',
        image: vision
    }
];

const WhySection = () => {
    return (
        <section className="why">
            <h2>Why CollegeMap?</h2>
            <div className="feature-grid">
                {features.map((feature, index) => (
                    <div key={index} className="feature">
                        <div className={`feature-image-wrapper bg-${index}`}>
                            <img src={feature.image} alt={feature.title} />
                        </div>
                        <h4>{feature.title}</h4>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhySection;
