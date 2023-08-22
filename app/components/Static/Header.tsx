import React from 'react';
import Logo from './Logo';
import { stringify } from 'querystring';

const Header = () =>
{
    // Get the site name from the environment variable
    const appName = process.env.NEXT_PUBLIC_SITE_NAME;
    
    return (
      <>
        <header>
          <p>{appName}</p>
        </header>
      </>
    );
};

export default Header;

