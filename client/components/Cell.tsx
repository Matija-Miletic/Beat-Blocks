import React, { useState } from 'react'
import { RiCheckboxBlankFill, RiCheckboxBlankLine } from 'react-icons/ri' // Import icons

interface Props {
  trackNumber: number
  cellNumber: number
}

export default function Cell({ trackNumber, cellNumber }: Props) {
  const [isActive, setIsActive] = useState(false)

  function handleClick() {
    setIsActive(!isActive)
  }

  const iconStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  return (
    <div className="cell" style={{ position: 'relative' }}>
      <button
        className="cell"
        onClick={handleClick}
        id={`cell-${trackNumber}-${cellNumber}`}
        style={{ width: '100%', height: '100%', padding: 0 }}
      >
        <div style={iconStyle}>
          {isActive ? (
            <RiCheckboxBlankFill size="100%" />
          ) : (
            <RiCheckboxBlankLine size="100%" />
          )}
        </div>
      </button>
    </div>
  )
}
