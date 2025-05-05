import React from 'react';
import './Team.scss';
import defaultphoto from "../../assets/default_photo.jpg"; // Import default photo

const teamMembers = [
    { name: 'Varun', role: 'CEO and Co-founder', img: '/assets/varun.jpg', url: "https://phosphoricons.com/?q=%22linkdin%22&color=%220e76a8%22&size=20" },
    { name: 'Rajan', role: 'COO and Co-founder', img: '/assets/rajan.jpg', url: "https://phosphoricons.com/?q=%22linkdin%22&color=%220e76a8%22&size=20" },
    { name: 'Kumar Pratul', role: 'Strategy & Growth - Founder\'s Office', img: '/assets/kumar.jpg', url: "https://phosphoricons.com/?q=%22linkdin%22&color=%220e76a8%22&size=20" },
    { name: 'Divyanshu', role: 'Lead - Tech and Engineering', img: '/assets/divyanshu.jpg', url: "https://phosphoricons.com/?q=%22linkdin%22&color=%220e76a8%22&size=20" },
    { name: 'Abhishek', role: 'Lead - Digital Marketing', img: '/assets/abhishek.jpg', url: "https://phosphoricons.com/?q=%22linkdin%22&color=%220e76a8%22&size=20" },
    { name: 'Shreya Sengupta', role: 'Lead - Human Resources', img: '/assets/shreya.jpg', url: "https://phosphoricons.com/?q=%22linkdin%22&color=%220e76a8%22&size=20" },
    { name: 'Gourav Salotra', role: 'Lead - Product', img: '/assets/gourav.jpg', url: "https://phosphoricons.com/?q=%22linkdin%22&color=%220e76a8%22&size=20" },
    { name: 'Naveen', role: 'Lead - Finance Solution', img: '/assets/naveen.jpg', url: "https://phosphoricons.com/?q=%22linkdin%22&color=%220e76a8%22&size=20" },
];

const Team = () => {
    const handleImageError = (e) => {
        e.target.src = defaultphoto; // Fallback to the default image if there's an error loading the image
    };

    return (
        <section className="team" id='Team'>
            <h2>Meet Our Team</h2>
            <p>We are building the future of E-Mentoring</p>
            <div className="team-grid">
                {teamMembers.map((member, index) => (
                    <div key={index} className="member">
                        <div className="photo">
                            <img
                                src={member.img}
                                alt={member.name}
                                onError={handleImageError} // Trigger the fallback on error
                            />
                        </div>
                        <h4>{member.name}</h4>
                        <a href={member.url} target='_blank' rel="noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0e76a8" viewBox="0 0 256 256"><path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path></svg></a>
                    </div>
                ))}
            </div>
        </section >
    );
};

export default Team;
