import React from 'react';
import brochureFile from '../assets/fabtech-profile.pdf'; // Import your file
import { Button } from '../styles/pages/home';

const DownloadBrochure = () => {
  const handleDownload = () => {
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = brochureFile;
    link.download = 'fabech-profile.pdf'; // File name for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button 
      onClick={handleDownload}
      className="download-btn"
    >
      Download Brochure
    </Button>
  );
};

export default DownloadBrochure;