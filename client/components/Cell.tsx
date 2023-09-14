import { useState } from 'react'

interface Props {
  trackNumber: number
  cellNumber: number
}

export default function Cell({ trackNumber, cellNumber }: Props) {
  const [isActive, setIsActive] = useState(false)

  function handleClick() {
    setIsActive(!isActive)
  }

  return (
    <div className="cell">
      <button
        className="cell"
        onClick={handleClick}
        id={`cell-${trackNumber}-${cellNumber}`}
      >
        {isActive ? 'X' : ' '}
      </button>
    </div>
  )
}
