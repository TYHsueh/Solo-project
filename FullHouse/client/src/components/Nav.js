import React from 'react';
import {Link} from 'react-router-dom';

const Nav = () => {
    return (
        <div>
            <div>
                <h1>FullHouse</h1>
                <h3>Winning in finding dream spaces</h3>
            </div>
            <div>
                <Link to={'/dashboard'}>Dashboard</Link>
                <Link to={'/createListing'} >Create Your Own Listing</Link>
                <Link>My Acoount</Link>
            </div>
            
        </div>
    );
}

export default Nav;
