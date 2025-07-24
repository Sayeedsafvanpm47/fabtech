import { useEffect } from 'react';

const GoogleReviews = () => {
  useEffect(() => {
    // Load the Elfsight script
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div 
      className="elfsight-app-690db12e-238c-4e82-b28b-ac557e9240e0" 
      data-elfsight-app-lazy
    />
  );
};

export default GoogleReviews; 