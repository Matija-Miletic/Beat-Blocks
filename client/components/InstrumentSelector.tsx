import React, { useState } from 'react'
import InstrumentRow from './InstrumentRow'

const InstrumentSelector: React.FC = () => {
  const [checkboxGrid, setCheckboxGrid] = useState<boolean[][]>(
    Array(4).fill(Array(16).fill(false)),
  )

  const handleInstrumentChange = (rowIndex: number, instrument: string) => {
    console.log(`Row ${rowIndex + 1} instrument changed to ${instrument}`)
  }

  const handleCheckboxChange = (
    rowIndex: number,
    checkboxIndex: number,
    isChecked: boolean,
  ) => {
    const newCheckboxGrid = [...checkboxGrid]
    newCheckboxGrid[rowIndex][checkboxIndex] = isChecked
    setCheckboxGrid(newCheckboxGrid)
  }

  return (
    <div>
      {checkboxGrid.map((row, rowIndex) => (
        <InstrumentRow
          key={rowIndex}
          initialCheckboxes={row}
          onInstrumentChange={(instrument) =>
            handleInstrumentChange(rowIndex, instrument)
          }
          onCheckboxChange={(index, isChecked) =>
            handleCheckboxChange(rowIndex, index, isChecked)
          }
        />
      ))}
    </div>
  )
}

export default InstrumentSelector
