import React, { useState, useEffect, useRef } from 'react'
import * as Tone from 'tone'

const SynthComponent = () => {
  const [synth, setSynth] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const boxRef = useRef(null)

  const startSynth = () => {
    if (!isPlaying) {
      const newSynth = new Tone.Synth().toDestination()
      setSynth(newSynth)
      setIsPlaying(true)

      // Trigger the note immediately when starting the synth
      if (boxRef.current) {
        const box = boxRef.current.getBoundingClientRect()
        const mouseY = box.height / 2 // You can set the initial Y position here
        const boxHeight = box.height

        playSynthNote(newSynth, mouseY, boxHeight)
      }
    }
  }

  const stopSynth = () => {
    if (synth) {
      synth.triggerRelease()
      setSynth(null)
      setIsPlaying(false)
    }
  }

  const playSynthNote = (synth, mouseY, boxHeight) => {
    // Calculate note and octave based on relative Y position (you can adjust the note range)
    const minNote = 'C3'
    const maxNote = 'C5'
    const noteRange = [
      'C',
      'D',
      'E',
      'F',
      'G',
      'A',
      'B',
      'Db',
      'Eb',
      'Gb',
      'Ab',
    ] // Include intermediate notes
    const noteIndex = Math.floor((mouseY / boxHeight) * noteRange.length)
    const selectedNote = noteRange[noteIndex]
    const selectedOctave = Math.floor(3 + (mouseY / boxHeight) * 3) // Adjust octave based on Y position
    const initialNote = selectedNote + selectedOctave

    synth.triggerAttack(initialNote)
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (synth && boxRef.current) {
        const box = boxRef.current.getBoundingClientRect()
        const mouseY = e.clientY - box.top // Get relative Y position in the box
        const boxHeight = box.height

        // Play the note continuously while the mouse is down
        if (isPlaying) {
          synth.triggerRelease()
          playSynthNote(synth, mouseY, boxHeight)
        }
      }
    }

    if (isPlaying) {
      window.addEventListener('mousemove', handleMouseMove)
    } else {
      window.removeEventListener('mousemove', handleMouseMove)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [synth, isPlaying])

  return (
    <div>
      <h1>Interactive Synth</h1>
      <div
        ref={boxRef}
        className="synth-box"
        onMouseDown={startSynth}
        onMouseUp={stopSynth}
        onMouseLeave={stopSynth}
      >
        <p>Hold Mouse Button to Play Notes (X Dimension Has No Effect)</p>
      </div>
    </div>
  )
}

export default SynthComponent
