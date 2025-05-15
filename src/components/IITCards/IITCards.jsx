import React from 'react';
import './IITCards.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import IITKharagpur from "../../assets/IITs/IITKharagpur.jpg";
import IITBombay from "../../assets/IITs/IITBombay.jpg";
import IITMadras from "../../assets/IITs/IITMadras.jpg";
import IITKanpur from "../../assets/IITs/IITKanpur.jpg";
import IITDelhi from "../../assets/IITs/IITDelhi.jpg";
import IITGuwahati from "../../assets/IITs/IITGuwahati.jpg";
import IITRoorkee from "../../assets/IITs/IITRoorkee.jpg";
import IITBhubaneswar from "../../assets/IITs/IITBhubaneswar.jpg";
import IITGandhinagar from "../../assets/IITs/IITGandhinagar.jpg";
import IITHyderabad from "../../assets/IITs/IITHyderabad.jpg";
import IITJodhpur from "../../assets/IITs/IITJodhpur.jpg";
import IITPatna from "../../assets/IITs/IITPatna.jpg";
import IITRopar from "../../assets/IITs/IITRopar.jpg";
import IITIndore from "../../assets/IITs/IITIndore.jpg";
import IITMandi from "../../assets/IITs/IITMandi.jpg";
import IITVaranasi from "../../assets/IITs/IITVaranasi.jpg";
import IITPalakkad from "../../assets/IITs/IITPalakkad.jpg";
import IITTirupati from "../../assets/IITs/IITTirupati.jpg";
import IITBhilai from "../../assets/IITs/IITBhilai.jpg";
import IITGoa from "../../assets/IITs/IITGoa.jpg";
import IITJammu from "../../assets/IITs/IITJammu.jpg";
import IITDharwad from "../../assets/IITs/IITDharwad.jpg";
import IITDhanbad from "../../assets/IITs/IITDhanbad.jpg";


// const iits = [
//     { name: 'IIT Kharagpur', link: 'http://www.iitkgp.ac.in', image: IITKharagpur },
//     { name: 'IIT Bombay', link: 'http://www.iitb.ac.in', image: IITBombay },
//     { name: 'IIT Madras', link: 'http://www.iitm.ac.in', image: IITMadras },
//     { name: 'IIT Kanpur', link: 'http://www.iitk.ac.in', image: IITKanpur },
//     { name: 'IIT Delhi', link: 'http://www.iitd.ac.in', image: IITDelhi },
//     { name: 'IIT Guwahati', link: 'http://www.iitg.ac.in', image: IITGuwahati },
//     { name: 'IIT Roorkee', link: 'https://www.iitr.ac.in', image: IITRoorkee },
//     { name: 'IIT Bhubaneswar', link: 'http://www.iitbbs.ac.in', image: IITBhubaneswar },
//     { name: 'IIT Gandhinagar', link: 'http://www.iitgn.ac.in', image: IITGandhinagar },
//     { name: 'IIT Hyderabad', link: 'http://www.iith.ac.in', image: IITHyderabad },
//     { name: 'IIT Jodhpur', link: 'https://www.iitj.ac.in', image: IITJodhpur },
//     { name: 'IIT Patna', link: 'http://www.iitp.ac.in', image: IITPatna },
//     { name: 'IIT Ropar', link: 'http://www.iitrpr.ac.in', image: IITRopar },
//     { name: 'IIT Indore', link: 'http://www.iiti.ac.in', image: IITIndore },
//     { name: 'IIT Mandi', link: 'http://www.iitmandi.ac.in', image: IITMandi },
//     { name: 'IIT (BHU) Varanasi', link: 'http://www.iitbhu.ac.in', image: IITVaranasi },
//     { name: 'IIT Palakkad', link: 'http://www.iitpkd.ac.in', image: IITPalakkad },
//     { name: 'IIT Tirupati', link: 'http://www.iittp.ac.in', image: IITTirupati },
//     { name: 'IIT Bhilai', link: 'https://www.iitbhilai.ac.in', image: IITBhilai },
//     { name: 'IIT Goa', link: 'http://www.iitgoa.ac.in', image: IITGoa },
//     { name: 'IIT Jammu', link: 'http://www.iitjammu.ac.in', image: IITJammu },
//     { name: 'IIT Dharwad', link: 'http://www.iitdh.ac.in', image: IITDharwad },
//     { name: 'IIT (ISM) Dhanbad', link: 'https://www.iitism.ac.in', image: IITDhanbad }
// ];

const iits = [
    { name: 'IIT Kharagpur', link: 'https://www.collegemap.in', image: IITKharagpur },
    { name: 'IIT Bombay', link: 'https://www.collegemap.in', image: IITBombay },
    { name: 'IIT Madras', link: 'https://www.collegemap.in', image: IITMadras },
    { name: 'IIT Kanpur', link: 'https://www.collegemap.in', image: IITKanpur },
    { name: 'IIT Delhi', link: 'https://www.collegemap.in', image: IITDelhi },
    { name: 'IIT Guwahati', link: 'https://www.collegemap.in', image: IITGuwahati },
    { name: 'IIT Roorkee', link: 'https://www.collegemap.in', image: IITRoorkee },
    { name: 'IIT Bhubaneswar', link: 'https://www.collegemap.in', image: IITBhubaneswar },
    { name: 'IIT Gandhinagar', link: 'https://www.collegemap.in', image: IITGandhinagar },
    { name: 'IIT Hyderabad', link: 'https://www.collegemap.in', image: IITHyderabad },
    { name: 'IIT Jodhpur', link: 'https://www.collegemap.in', image: IITJodhpur },
    { name: 'IIT Patna', link: 'https://www.collegemap.in', image: IITPatna },
    { name: 'IIT Ropar', link: 'https://www.collegemap.in', image: IITRopar },
    { name: 'IIT Indore', link: 'https://www.collegemap.in', image: IITIndore },
    { name: 'IIT Mandi', link: 'https://www.collegemap.in', image: IITMandi },
    { name: 'IIT (BHU) Varanasi', link: 'https://www.collegemap.in', image: IITVaranasi },
    { name: 'IIT Palakkad', link: 'https://www.collegemap.in', image: IITPalakkad },
    { name: 'IIT Tirupati', link: 'https://www.collegemap.in', image: IITTirupati },
    { name: 'IIT Bhilai', link: 'https://www.collegemap.in', image: IITBhilai },
    { name: 'IIT Goa', link: 'https://www.collegemap.in', image: IITGoa },
    { name: 'IIT Jammu', link: 'https://www.collegemap.in', image: IITJammu },
    { name: 'IIT Dharwad', link: 'https://www.collegemap.in', image: IITDharwad },
    { name: 'IIT (ISM) Dhanbad', link: 'https://www.collegemap.in', image: IITDhanbad }
];

const IITCards = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 800,
        autoplay: true,
        autoplaySpeed: 2500,
        slidesToShow: 4,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '20px',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    centerMode: false,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerMode: false,
                }
            }
        ]
    };

    return (
        <div className="iit-carousel-wrapper">
            <h2 className="carousel-title">Explore the world of IITs</h2>
            <Slider {...settings} className="iit-carousel">
                {iits.map((iit, index) => (
                    <div className="iit-card" key={index}>
                        <div className="card-inner">
                            <img src={iit.image} alt={iit.name} className="card-image" />
                            <div className="card-content">
                                <h3 className="card-title">{iit.name}</h3>
                                <a href={iit.link} target="_blank" rel="noopener noreferrer" className="card-link">View Information</a>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default IITCards;