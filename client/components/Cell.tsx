import React, { useState, useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import { RiCheckboxBlankFill, RiCheckboxBlankLine } from 'react-icons/ri'
import { SelectedBeat } from '../../models/beats'

interface Props {
  trackNumber: number
  cellNumber: number
  reset: boolean
  handleCellStateChange: (cellID: string, newIsActive: boolean) => void
  isActive: boolean
  selectedBeat: SelectedBeat | null
}

export default function Cell({
  trackNumber,
  cellNumber,
  reset,
  selectedBeat,
  handleCellStateChange,
}: Props) {
  const [showImage, setShowImage] = useState<boolean>(false)
  const cellID = `cell-${trackNumber}-${cellNumber}`

  // Use a state variable to manage the isActive state based on selectedBeat
  const [isActive, setIsActive] = useState<boolean>(false)

  useEffect(() => {
    // When selectedBeat changes, update the isActive state based on the cell_states
    if (selectedBeat) {
      const presetBeat = selectedBeat.cell_states.find(
        (cellState) => cellState.id === cellID,
      )
      setIsActive(presetBeat ? presetBeat.isActive : false)
    }
  }, [selectedBeat, cellID])

  function handleClick() {
    const newIsActive = !isActive
    handleCellStateChange(cellID, newIsActive)
    setIsActive(newIsActive)

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
    1: 'b-red',
    2: 'b-yellow',
    3: 'b-green',
    4: 'b-blue',
    5: 'b-orange',
    6: 'b-purple',
  }
  const trackClassName = trackClassMap[trackNumber] || 'b-red'
  console.log({ trackClassName })

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
            <Box
              className={`brick 1x1 ${trackClassName}`}
              transform="scale(1.5)"
            />
          ) : (
            <Box border="1px">
              <RiCheckboxBlankLine size="100%" />
            </Box>
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
