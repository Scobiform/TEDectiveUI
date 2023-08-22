import React from 'react';

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

