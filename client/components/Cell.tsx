import React, { useState, useEffect } from 'react'

import { Box } from '@chakra-ui/react'
import { RiCheckboxBlankFill, RiCheckboxBlankLine } from 'react-icons/ri'

interface Props {
  trackNumber: number
  cellNumber: number
  reset: boolean
  handleCellStateChange: (cellID: string, newIsActive: boolean) => void
  isActive: boolean
}

export default function Cell({
  trackNumber,
  cellNumber,
  reset,
  handleCellStateChange,
}: Props) {
  const [isActive, setIsActive] = useState<boolean>(false)
  const [showImage, setShowImage] = useState<boolean>(false)
  const cellID = `cell-${trackNumber}-${cellNumber}`

  function handleClick() {
    const newIsActive = !isActive
    handleCellStateChange(cellID, newIsActive)
    setIsActive(!isActive)

    setShowImage(true)

    setTimeout(() => {
      setShowImage(false)
    }, 3000)

    setTimeout(() => {
      setShowImage(false)
    }, 1000)
  }

  const iconStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  }

  const trackClassMap: { [key: number]: string } = {
    0: 'b-purple',
    1: 'b-red',
    2: 'b-yellow',
    3: 'b-green',
    4: 'b-blue',
    5: 'b-orange',
  }
  const trackClassName = trackClassMap[trackNumber] || 'b-red'

  useEffect(() => {
    if (reset) {
      setIsActive(false)
    }
  }, [reset])

  return (
    <div className="cell" style={{ position: 'relative' }}>
      <button
        className={`cell ${trackClassName}`}
        onClick={handleClick}
        value={isActive ? 'active' : 'inactive'}
        id={cellID}
        style={{ width: '100%', height: '100%', padding: 0 }}
      >
        <div style={iconStyle}>
          {isActive ? (
            <Box className={`brick 1x1 ${trackClassName}`} />
          ) : (
            <RiCheckboxBlankLine size="100%" />
          )}
          {showImage && (
            <img
              src={`/images/lego${cellNumber}.png`}
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
  )
}
