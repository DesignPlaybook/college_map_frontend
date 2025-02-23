import "./Footer.scss";

const Footer = () => {
    return (
        <footer className="bg-jet text-white py-4 mt-10 text-center">
            <p className="text-gray">© {new Date().getFullYear()} CollegeMap. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
