import React, { useState } from 'react';
import './VideoEmbedComponent.scss';

const VideoEmbedComponent = () => {
    const [showPopup, setShowPopup] = useState(true);
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="video-embed-container">
            {/* Part 1: Smaller Embedded Video */}
            <div className="video-section">
                <h2 className="video-title">🎬 Watch a Demo to Get the Full Picture</h2>
                <div className="video-frame">
                    <iframe
                        src="https://www.youtube.com/embed/YOUR_VIDEO_ID_HERE"
                        title="Demo Video"
                        allowFullScreen
                        frameBorder="0"
                    ></iframe>
                </div>
            </div>

            {/* Part 2: Slide-in Popup */}
            {showPopup && (
                <div className="video-popup open">
                    <div className="popup-content">
                        <p>👋 Need clarity? Watch the demo!</p>
                        <button className="popup-watch" onClick={() => setShowModal(true)}>
                            ▶ Play
                        </button>
                        <button className="popup-close" onClick={() => setShowPopup(false)}>×</button>
                    </div>
                </div>
            )}

            {/* Modal Video Player */}
            {showModal && (
                <div className="video-modal" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
                        <iframe
                            src="https://www.youtube.com/embed/YOUR_VIDEO_ID_HERE?autoplay=1"
                            title="Demo Video"
                            allow="autoplay; fullscreen"
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoEmbedComponent;
