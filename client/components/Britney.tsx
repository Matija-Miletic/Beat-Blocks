// src/components/Tune.js
import React, { useEffect } from 'react'
import * as Tone from 'tone'

export const Britney = () => {
  useEffect(() => {
    // Create a Tone.js synthesizer
    const synth = new Tone.Synth().toDestination()

    // Define a melody using a sequence of notes
    const melody = ['C4', 'E4', 'G4', 'A4', 'G4', 'E4']

    // Play the melody
    melody.forEach((note, index) => {
      const time = `0:${index}`
      synth.triggerAttackRelease(note, '4n', time)
    })
  }, [])

  return (
    <div>
      <h1>Play a Tune</h1>
    </div>
  )
}
