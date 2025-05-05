import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import './Stats.scss';

const Stats = () => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });

    return (
        <section className="stats" ref={ref}>
            <div className="wave-svg-top">
                <svg viewBox="0 90 1440 30" preserveAspectRatio="none" width="100%" height="50">
                    <path
                        fill="#dff6ff"
                        fillOpacity="1"
                        d="M0,96 C120,64 240,128 360,96 C480,64 600,128 720,96 C840,64 960,128 1080,96 C1200,64 1320,128 1440,96 L1440,0 L0,0 Z"
                    />
                </svg>

            </div>
            <div className="content">
                <p className="headline">
                    Our <strong>student community is more than one million</strong> strong<br />
                    <span>(and this is just the beginning)</span>
                </p>

                <div className="numbers">
                    <div>
                        <span>{inView && <CountUp end={19} duration={5} suffix="M+" />}</span>
                        <p>study sessions</p>
                    </div>
                    <div>
                        <span>{inView && <CountUp end={4} duration={5} suffix="M+" />}</span>
                        <p>study goals reached</p>
                    </div>
                    <div>
                        <span>{inView && <CountUp end={215} duration={5} />}</span>
                        <p>countries</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stats;
