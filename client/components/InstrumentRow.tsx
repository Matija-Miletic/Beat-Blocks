import React, { useState } from 'react'
import { RiCheckboxBlankFill, RiCheckboxBlankLine } from 'react-icons/ri'

type InstrumentRowProps = {
  onInstrumentChange: (instrument: string) => void
  onCheckboxChange: (index: number, isChecked: boolean) => void
  initialCheckboxes: boolean[]
}

const InstrumentRow: React.FC<InstrumentRowProps> = ({
  onInstrumentChange,
  onCheckboxChange,
  initialCheckboxes,
}) => {
  const [selectedInstrument, setSelectedInstrument] = useState<string | null>(
    null,
  )
  const [checkboxes, setCheckboxes] = useState<boolean[]>(initialCheckboxes)

  const handleInstrumentChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedInstrument(event.target.value)
    onInstrumentChange(event.target.value)
  }

  const handleCheckboxChange = (index: number) => {
    const newCheckboxes = [...checkboxes]
    newCheckboxes[index] = !newCheckboxes[index]
    setCheckboxes(newCheckboxes)
    onCheckboxChange(index, newCheckboxes[index])
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <select
        value={selectedInstrument || ''}
        onChange={handleInstrumentChange}
      >
        <option value="">Select an instrument</option>
        <option value="bass">Bass</option>
        <option value="hi-hat">Hi-Hat</option>
        <option value="hip-hop-snare">Hip-Hop Snare</option>
      </select>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(16, 1fr)',
          marginLeft: '10px',
        }}
      >
        {checkboxes.map((isChecked, index) => (
          <label key={index} onClick={() => handleCheckboxChange(index)}>
            {isChecked ? <RiCheckboxBlankFill /> : <RiCheckboxBlankLine />}
          </label>
        ))}
      </div>
    </div>
  )
}

export default InstrumentRow
