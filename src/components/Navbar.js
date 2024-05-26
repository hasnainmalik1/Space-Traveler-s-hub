import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className='background'>
            <div className="Navbar1">
                <img id="image" src='https://space-travelers-thecodechaser.netlify.app/static/media/logo.c1cd168acba305496d99.png' alt="logo" className="logo" />
                <h1 className='p'>Space Traveler's Hub</h1>
                <ul className="ul">
                    <li><Link to="/Profile"><h3>Profile</h3></Link></li>
                    <li><Link to="/Missions"><h3>Missions</h3></Link></li>
                    <li><Link to="/"><h3>Rockets</h3></Link></li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;