import React from 'react'
import * as Tone from 'tone'

interface SoundOption {
  label: string
  oscillatorType: Tone.OscillatorType
}

const soundOptions: SoundOption[] = [
  { label: 'Sine Wave', oscillatorType: 'sine' },
  { label: 'Square Wave', oscillatorType: 'square' },
  { label: 'Triangle Wave', oscillatorType: 'triangle' },
  { label: 'Sawtooth Wave', oscillatorType: 'sawtooth' },
]

interface Props {
  synth: Tone.Synth | null
}

const SoundSelector: React.FC<Props> = ({ synth }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOscillatorType = event.target.value as Tone.OscillatorType
    if (synth) {
      synth.oscillator.type = selectedOscillatorType
    }
  }

  return (
    <select onChange={handleChange}>
      {soundOptions.map((option, index) => (
        <option key={index} value={option.oscillatorType}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default SoundSelector
