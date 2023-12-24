import React, { useEffect, useState } from 'react';
import './bg.css';
const ScrollBackgroundChange = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
    
      const threshold = 100;
      const isScrolled = window.scrollY > threshold;

      setScrolled(isScrolled);
    };

    
    window.addEventListener('scroll', handleScroll);

   
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 

  return (
    <div className={`background-container ${scrolled ? 'scrolled' : ''}`}>
     <div>
       
     </div>
    </div>
  );
};

export default ScrollBackgroundChange;
