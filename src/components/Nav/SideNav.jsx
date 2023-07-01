import React, { useEffect, useState } from 'react';

const SideNav = ({show, children}) => {

  const [animationClass, setAnimationClass] = useState('slide-in');

  useEffect(() => {
    if (show) {
      setAnimationClass('slide-in-right-side');
    } else {
      setAnimationClass('slide-out-right-side');
    }
  }, [show]);

  return (
    <div 
      className={`sidenav position-fixed ${animationClass}`} style={{ marginTop: '50px', zIndex: 200}}>
      {children}
    </div>
  );
};

export default SideNav;