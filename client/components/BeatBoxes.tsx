import React, { useState } from 'react'

const InstrumentSelector: React.FC = () => {
  const [selectedInstrument, setSelectedInstrument] = useState<string | null>(
    null,
  )
  const [checkboxes, setCheckboxes] = useState<boolean[]>(Array(16).fill(false))

  const handleInstrumentChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedInstrument(event.target.value)
  }

  const handleCheckboxChange = (index: number) => {
    const newCheckboxes = [...checkboxes]
    newCheckboxes[index] = !newCheckboxes[index]
    setCheckboxes(newCheckboxes)
  }

  return (
    <div>
      <select
        value={selectedInstrument || ''}
        onChange={handleInstrumentChange}
      >
        <option value="">Select an instrument</option>
        <option value="bass">Bass</option>
        <option value="hi-hat">Hi-Hat</option>
        <option value="hip-hop-snare">Hip-Hop Snare</option>
      </select>
      <div>
        {checkboxes.map((isChecked, index) => (
          <label key={index}>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => handleCheckboxChange(index)}
            />
          </label>
        ))}
      </div>
    </div>
  )
}

export default InstrumentSelector
