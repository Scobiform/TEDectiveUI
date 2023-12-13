import React from 'react';

const Header = () =>
{
    // Get the site name from the environment variable
    const appName = process.env.NEXT_PUBLIC_NAME;
    const subString = appName?.substring(0, 3);
    
    return (
      <>
        <header>
          <p><b>{subString}</b>{appName?.substring(3, appName.length)}</p>
        </header>
      </>
    );
};

export default Header;

