import React from 'react';
import './AboutUs.scss';

import vision from '../../assets/aboutus/vision.png';
import mission from '../../assets/aboutus/mission.png';
import usp from '../../assets/aboutus/usp.png';
import visionImg from "../../assets/vision.png"
// import missionImg from '../../assets/mission.png';
// import uspImg from '../../assets/usp.png';
// import chartLine from '../../assets/chart-line.png';
// import chartBar from '../../assets/chart-bar.png';
// import chartScatter from '../../assets/chart-scatter.png';

const AboutUs = () => {
    return (
        <div className="about-us">
            <section className="intro">
                <h1>About Us</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vehicula cursus lorem, a tincidunt nunc fermentum non.</p>
            </section>

            <section className="vision-mission">
                <div className="item">
                    <img src={vision} alt="Vision" />
                    <div className="text">
                        <h2>Our Vision</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis egestas rhoncus.</p>
                    </div>
                </div>

                <div className="item reverse">
                    <div className="text">
                        <h2>Our Mission</h2>
                        <p>Aliquam erat volutpat. Curabitur convallis, mauris a tincidunt luctus, nunc eros malesuada magna, et placerat.</p>
                    </div>
                    <img src={mission} alt="Mission" />
                </div>

                <div className="item">
                    <img src={usp} alt="USP" />
                    <div className="text">
                        <h2>USP</h2>
                        <p>Praesent sit amet libero vel ex maximus vulputate. Cras ultricies lorem at augue porta vehicula.</p>
                    </div>
                </div>
            </section>

            <section className="stats">
                <h2>Stats</h2>
                <div className="chart">
                    {/* You can later replace this with an actual chart */}
                    <img src={visionImg} alt="Stats Chart" />
                </div>
                <div className="figures">
                    <div className="figure">
                        <h3>2.1+ crore</h3>
                        <p>hours of LIVE learning</p>
                    </div>
                    <div className="figure">
                        <h3>10+ lakh</h3>
                        <p>monthly YouTube views</p>
                    </div>
                    <div className="figure">
                        <h3>25+ lakh</h3>
                        <p>doubts resolved on the app</p>
                    </div>
                    <div className="figure">
                        <h3>57+ countries</h3>
                        <p>where students take LIVE classes</p>
                    </div>
                </div>
            </section>

            <section className="iit-section">
                <h2>By IITians for IITians</h2>
            </section>
        </div>
    );
};

export default AboutUs;
