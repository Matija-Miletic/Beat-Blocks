import React, { useState, useEffect } from 'react';
import { RiCheckboxBlankFill, RiCheckboxBlankLine } from 'react-icons/ri';

interface Props {
  trackNumber: number;
  cellNumber: number;
  reset: boolean; // Add a reset prop
  //handleReset() => void
}

const Cell: React.FC<Props> = ({ trackNumber, cellNumber, reset }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [showImage, setShowImage] = useState<boolean>(false);

  useEffect(() => {
    
    if (reset) {
      
      setIsActive(false);
    }
  }, [reset]); 

  function handleClick() {
    setIsActive(!isActive);

    setShowImage(true);

    setTimeout(() => {
      setShowImage(false);
    }, 3000);

    setTimeout(() => {
      setShowImage(false);
    }, 1000);
  }

  const iconStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  };

  return (
    <div className="cell" style={{ position: 'relative' }}>
      <button
        className="cell"
        onClick={handleClick}
        value={isActive ? 'active' : 'inactive'}
        id={`cell-${trackNumber}-${cellNumber}`}
        style={{ width: '100%', height: '100%', padding: 0 }}
      >
        <div style={iconStyle}>
          {isActive ? (
            <RiCheckboxBlankFill size="100%" />
          ) : (
            <RiCheckboxBlankLine size="100%" />
          )}
          {showImage && (
            <img
              src={`../../public/images/lego${cellNumber}.png`}
              alt="Small"
              className="animated-image"
              style={{
                position: 'absolute',
                width: '80px',
                height: 'auto',
                animation: 'moveDown 2s ease-in-out, fadeOut 2s ease-in-out',
                top: '0',
                left: '0',
              }}
            />
          )}
        </div>
      </button>
    </div>
  );
};

export default Cell;
