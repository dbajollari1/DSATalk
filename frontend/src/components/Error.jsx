import React from 'react';
import '../App.css';

function Error({ errorCode, message }) {
  const getImagePath = (code) => {
    const errorImages = {
      400: '../../public/imgs/400.svg',
      401: '../../public/imgs/401.svg',
      404: '../../public/imgs/404.svg',
      500: '../../public/imgs/500.svg'
    };

    return errorImages[code] || '../../public/imgs/genericError.svg' ; 
  };

  return (
    <div className='card'>
      <h2>Error loading resource due to {message} error</h2>
      <img src={getImagePath(errorCode)} alt={`Error ${errorCode}`} />
    </div>
  );
}

export default Error;
