import { useState } from 'react'
import { RiCheckboxBlankFill, RiCheckboxBlankLine } from 'react-icons/ri'

interface Props {
  trackNumber: number
  cellNumber: number
}

export default function Cell2({ trackNumber, cellNumber }: Props) {
  // const isActive = true

  // const iconStyle: React.CSSProperties = {
  //   width: '0%',
  //   height: '100%',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   position: 'relative',
  // }

  return (
    <div className="light-down" style={{ position: 'relative' }}>
      <button
        className="light-down"
        value={'active'}
        id={`cell-${trackNumber}-${cellNumber}`}
        style={{ width: '100%', height: '100%', padding: 0 }}
      >
        <div></div>
      </button>
    </div>
  )
}
