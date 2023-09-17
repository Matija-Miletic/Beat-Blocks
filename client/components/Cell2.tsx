import { useState } from 'react'
import { RiCheckboxBlankFill, RiCheckboxBlankLine } from 'react-icons/ri'

interface Props {
  trackNumber: number
  cellNumber: number
}

export default function Cell({ trackNumber, cellNumber }: Props) {
  const [isActive, setIsActive] = useState<boolean>(false)
  const [showImage, setShowImage] = useState<boolean>(false)

  function handleClick() {
    setIsActive(!isActive)

    setShowImage(true)

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
              src={`/images/lego1.png`}
              alt="Small"
              className="animated-image"
              style={{
                position: 'absolute',
                width: '80px',
                height: 'auto',
                animation: 'moveDown 2s, fadeOut 2s',
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
