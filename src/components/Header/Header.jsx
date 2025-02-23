import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
    return (
        <header className="bg-eerie-black text-white py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center px-6">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-turquoise">
                    CollegeMap
                </Link>

                {/* Navigation */}
                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <Link to="/" className="hover:text-turquoise transition-colors">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="hover:text-turquoise transition-colors">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-turquoise transition-colors">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
