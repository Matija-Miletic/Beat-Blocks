import { useState } from 'react'
import * as Tone from 'tone'

import * as Buttons from './PlaybackButtons'
import { ResetButton } from './ResetButton'
import { LaserButton } from './LaserButton'
import Track from './Track'
import TempoSlider from './TempoSlider'
import { Lasers } from './Lasers'

const TRACK_COUNT = 6
const STEP_COUNT = 32

export default function Sequencer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const trackNumber = [...Array(TRACK_COUNT).keys()]
  const [isLaserActive, setIsLaserActive] = useState(false) // New state variable
  const handleTempoChange = (newTempo: number) => {
    console.log(`New Tempo: ${newTempo} BPM`)
  }

  let currentStep = 0
  // TODO: Get BPM from tempo slider component
  Tone.Transport.bpm.value = 120

  // TODO: add more drum samples => clap, hihat-closed, hihat-open, snare, kick, 808, percussion, melody
  const drumParts = new Tone.Players({
    0: '/samples/808.wav',
    1: '/samples/clap-alt.wav',
    2: '/samples/percussion-alt.wav',
    3: '/samples/hihat-alt.wav',
    4: '/samples/snare-alt.wav',
    5: '/samples/kick-alt.wav',
  }).toDestination()

  const mainLoop = new Tone.Loop()
  mainLoop.callback = (time) => {
    for (let track = 0; track < trackNumber.length; track++) {
      // Check cell of each track for current step then play drum part if active
      if (
        document
          .getElementById(`cell-${track}-${currentStep}`)
          ?.getAttribute('value') === 'active'
      ) {
        drumParts.player(String(track)).sync().start(time).stop()
      }
      //vvvvv ADD CODE BELOW vvvvv

      //^^^^^ ADD CODE ABOVE ^^^^^
    }
    currentStep < STEP_COUNT - 1 ? currentStep++ : (currentStep = 0)

    //vvvvv ADD CODE BELOW vvvvv

    //^^^^^ ADD CODE ABOVE ^^^^^
  }
  // Start this outside of the play/pause function otherwise it will start another loop
  mainLoop.interval = '16n'
  mainLoop.start()

  function handlePlay() {
    console.log('play')

    // Dispose of previous loop to prevent multiple loops from running
    mainLoop.dispose()

    // Resume audio context on user interaction otherwise audio will not play
    Tone.context.resume()

    setIsPlaying(true)

    Tone.Transport.start('+0.001')
  }

  function handlePause() {
    console.log('pause')

    // Dispose of previous loop to prevent multiple loops from running
    mainLoop.dispose()

    // Resume audio context on user interaction otherwise audio will not play
    Tone.context.resume()

    setIsPlaying(false)

    Tone.Transport.pause()
    drumParts.stopAll()
  }

  // Function to toggle laser state
  const toggleLaser = () => {
    setIsLaserActive((prevState) => !prevState)
  }

  return (
    <>
      <div className="button-container">
        {isPlaying ? (
          <Buttons.PauseButton onClick={handlePause} />
        ) : (
          <Buttons.PlayButton onClick={handlePlay} />
        )}
        <Buttons.RecordButton />
        <ResetButton />
        <LaserButton toggleLaser={toggleLaser} />
        {/* Passing the toggle function */}
      </div>
      {trackNumber.map((track) => {
        return <Track key={track} trackNumber={track} steps={STEP_COUNT} />
      })}
      <div className="slider-container">
        <TempoSlider onChange={handleTempoChange} />
      </div>
      {isLaserActive && <Lasers />} {/* Conditionally render based on state */}
    </>
  )
}
