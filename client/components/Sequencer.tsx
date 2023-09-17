import { useState } from 'react'
import * as Tone from 'tone'

import Track from './Track'
import lighting from '../lighting'
import { Button } from '@chakra-ui/react'
import TempoSlider from './TempoSlider'
import { ClassNames } from '@emotion/react'

const TRACK_COUNT = 4
const STEP_COUNT = 16

export default function Sequencer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const trackNumber = [...Array(TRACK_COUNT).keys()]
  // Sets state for showing flashing colours
  const [lights, setLights] = useState(false)

  // Sets tempo state used to determine speed of sequencer and animation timeout
  const [tempo, setTempo] = useState(100)

  let currentStep = 0

  const drumPart = new Tone.Players({
    0: '/samples/clap.wav',
    1: '/samples/hihat.wav',
    2: '/samples/snare.wav',
    3: '/samples/kick.wav',
  }).toDestination()

  console.log(drumPart)

  const mainLoop = new Tone.Loop()
  mainLoop.callback = (time) => {
    for (let track = 0; track < trackNumber.length; track++) {
      //Check cell of each track for current step then play drum part if active
      const cell = document.getElementById(`cell-${track}-${currentStep}`)
      if (cell?.getAttribute('value') === 'active') {
        {
          drumPart
            .player(String(track))
            .sync()
            .start(time)
            .stop(time + 0.1)

          Tone.Draw.schedule(function () {
            //this callback is invoked from a requestAnimationFrame
            //and will be invoked close to AudioContext time
            if (lights) lighting()
            cell.classList.add('animate')
            setTimeout(() => {
              cell.classList.remove('animate')
            }, 99)
          }, time)
        }
      }
    }
    currentStep < STEP_COUNT - 1 ? currentStep++ : (currentStep = 0)

    //vvvvv ADD CODE BELOW vvvvv
    console.log(time)
    //^^^^^ ADD CODE ABOVE ^^^^^
  }
  // Start this outside of the play/pause function otherwise it will start another loop
  mainLoop.interval = 1 / (tempo / 60)
  mainLoop.start()

  function handlePlayPause() {
    // Dispose of previous loop to prevent multiple loops from running
    mainLoop.dispose()

    // Resume audio context on user interaction otherwise audio will not play
    Tone.context.resume()

    setIsPlaying((prevState) => !prevState)

    // Set transport state: .start() | .stop() | .pause()
    if (isPlaying) {
      Tone.Transport.pause()
      drumPart.stopAll()
    } else {
      Tone.Transport.start('+0.001')
    }
  }
  console.log('lights', lights)

  // Set BPM to match tempo slider
  const handleTempoChange = (newTempo: number) => {
    console.log(`New Tempo: ${newTempo} BPM`)
    mainLoop.dispose()
    setTempo(newTempo)
  }
  return (
    <>
      <div className="sequencer"></div>
      <Button
        onClick={() => {
          setLights(!lights)
        }}
      >
        Lights?
      </Button>
      <button onClick={handlePlayPause}>{isPlaying ? 'PAUSE' : 'PLAY'}</button>
      {trackNumber.map((track) => {
        return <Track key={track} trackNumber={track} steps={STEP_COUNT} />
      })}
      {isPlaying ? (
        <div className="slider-container no-interaction">
          <TempoSlider onChange={handleTempoChange} />
        </div>
      ) : (
        <div className="slider-container">
          <TempoSlider onChange={handleTempoChange} />
        </div>
      )}
    </>
  )
}
