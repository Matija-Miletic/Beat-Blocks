import React, { useState, useEffect, useRef } from 'react'
import * as Tone from 'tone'

const SynthComponent = () => {
  const [synth, setSynth] = useState(new Tone.Synth().toDestination()) // Initialize with a default synth
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedSynth, setSelectedSynth] = useState('Synth') // Default to 'Synth'
  const boxRef = useRef(null)
  const isInsideBox = useRef(false)
  let stopSynthTimeout

  // Function to create and set the active synth based on the selected type
  const createAndSetSynth = () => {
    if (synth) {
      synth.dispose() // Dispose of the previous synth
    }

    let newSynth

    // Create the selected synth type
    newSynth = Tone[selectedSynth]
      ? new Tone[selectedSynth]().toDestination()
      : new Tone.Synth().toDestination()

    setSynth(newSynth)
  }

  // Handle changes in the selected synth type
  useEffect(() => {
    createAndSetSynth()
  }, [selectedSynth])

  const startSynth = (initialMouseY) => {
    setIsPlaying(true)

    // Trigger the note immediately when starting the synth
    if (boxRef.current) {
      const box = boxRef.current.getBoundingClientRect()
      const mouseY = initialMouseY - box.top // Get relative Y position in the box
      const boxHeight = box.height

      playSynthNote(synth, mouseY, boxHeight)
    }
  }

  const stopSynth = () => {
    if (synth) {
      // Clear any existing stopSynthTimeout
      if (stopSynthTimeout) {
        clearTimeout(stopSynthTimeout)
      }

      // Delay the synth stop for a short period (e.g., 100 milliseconds)
      stopSynthTimeout = setTimeout(() => {
        synth.triggerRelease()
        setIsPlaying(false)
        isInsideBox.current = false
      }, 1) // Adjust the delay duration as needed
    }
  }

  const playSynthNote = (synth, mouseY, boxHeight) => {
    // Calculate note and octave based on relative Y position (you can adjust the note range)
    const minNote = 'C1'
    const maxNote = 'C8'
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
      if (boxRef.current) {
        const box = boxRef.current.getBoundingClientRect()
        const mouseY = e.clientY - box.top // Get relative Y position in the box
        const boxHeight = box.height

        if (mouseY >= 0 && mouseY <= boxHeight) {
          // Mouse is inside the box
          isInsideBox.current = true

          // If the synth was not playing, start it
          if (!isPlaying) {
            startSynth(e.clientY)
          } else {
            // Synth is already playing, update the note
            playSynthNote(synth, mouseY, boxHeight)
          }
        } else if (isInsideBox.current && isPlaying) {
          // Mouse was inside but has moved outside, stop the synth
          stopSynth()
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
      <div>
        {/* Dropdown menu to select the synth type */}
        <label htmlFor="synthSelect">Select Synth Type: </label>
        <select
          id="synthSelect"
          value={selectedSynth}
          onChange={(e) => setSelectedSynth(e.target.value)}
        >
          <option value="Synth">Synth</option>
          <option value="AMSynth">AMSynth</option>
          <option value="DuoSynth">DuoSynth</option>
          <option value="FMSynth">FMSynth</option>
          <option value="MembraneSynth">MembraneSynth</option>
          <option value="PluckSynth">PluckSynth</option>
        </select>
      </div>
      <div
        ref={boxRef}
        className="synth-box"
        onMouseDown={(e) => startSynth(e.clientY)}
        onMouseUp={stopSynth}
        onMouseLeave={stopSynth}
      >
        <p>Hold Mouse Button to Play Notes (X Dimension Has No Effect)</p>
      </div>
    </div>
  )
}

export default SynthComponent
