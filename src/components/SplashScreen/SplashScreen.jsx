import { motion } from "framer-motion";
import "./SplashScreen.scss"; // Import CSS
import bottomImage from "../../assets/logo/cm_bottom.png"; // Import image
import topImage from "../../assets/logo/cm_top.png"; // Import image

const SplashScreen = () => {
    return (
        <div className="splash-screen">
            <div className="image-container">
                {/* Bouncing Image (Top) */}
                <motion.img
                    src={topImage}
                    alt="Bouncing"
                    className="top-image"
                    initial={{ y: -30 }}
                    animate={{ y: [-30, 0, -30] }} // Bouncing effect
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Static Image (Bottom) */}
                {/* <img src={bottomImage} alt="Static" className="bottom-image" /> */}
                <motion.img
                    src={bottomImage}
                    alt="Static"
                    className="bottom-image"
                    initial={{ scale: 0.8 }} // Start small
                    animate={{ scale: 1.2 }} // Gradually grow
                    transition={{ duration: 2, ease: "easeInOut" }} // Smooth transition
                />
            </div>
        </div>
    );
};

export default SplashScreen;
