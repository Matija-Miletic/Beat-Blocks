import { useState } from 'react'
import * as Tone from 'tone'

import * as Buttons from './PlaybackButtons'
import { ResetButton } from './ResetButton'
import { LaserButton } from './LaserButton'
import Track from './Track'
import lighting from '../lighting'
import TempoSlider from './TempoSlider'
import { Lasers } from './Lasers'

const TRACK_COUNT = 6
const STEP_COUNT = 32

interface Props {
  tempoProp: number
}

interface CellData {
  isActive: boolean
}

export default function Sequencer({ tempoProp }: Props) {
  const [isPlaying, setIsPlaying] = useState(false)
  const trackNumber = [...Array(TRACK_COUNT).keys()]

  // Sets state for showing flashing colours
  const [lights, setLights] = useState(false)

  // Sets tempo state used to determine speed of sequencer and animation timeout
  const [tempo, setTempo] = useState(100)
  const [isLaserActive, setIsLaserActive] = useState(false) // New state variable

  let currentStep = 0
  // TODO: Get BPM from tempo slider component
  Tone.Transport.bpm.value = 120

  // TODO: add more drum samples => clap, hihat-closed, hihat-open, snare, kick, 808, percussion, melody
  const drumPart = new Tone.Players({
    0: '/samples/808.wav',
    1: '/samples/clap-alt.wav',
    2: '/samples/percussion-alt.wav',
    3: '/samples/hihat-alt.wav',
    4: '/samples/snare-alt.wav',
    5: '/samples/kick-alt.wav',
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

      //vvvvv ADD CODE BELOW vvvvv

      //^^^^^ ADD CODE ABOVE ^^^^^
    }
    currentStep < STEP_COUNT - 1 ? currentStep++ : (currentStep = 0)

    //vvvvv ADD CODE BELOW vvvvv

    //^^^^^ ADD CODE ABOVE ^^^^^
  }
  // Start this outside of the play/pause function otherwise it will start another loop
  mainLoop.interval = 1 / (tempoProp / 60)
  // mainLoop.interval = '16n'
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
    drumPart.stopAll()
  }

  // Function to toggle laser state
  const toggleLaser = () => {
    setIsLaserActive((prevState) => !prevState)
  }
  console.log('lights', lights)

  // Set BPM to match tempo slider
  const handleTempoChange = (newTempo: number) => {
    console.log(`New Tempo: ${newTempo} BPM`)
    mainLoop.dispose()
    setTempo(newTempo)
  }

  const [cellData, setCellData] = useState<CellData[][]>(() =>
    Array(TRACK_COUNT)
      .fill([])
      .map(() => Array(STEP_COUNT).fill({ isActive: false })),
  )

  const handleReset = () => {
    console.log('reset has triggered')

    // Iterate over cell data and set isActive to false for active cells
    const updatedCellData: CellData[][] = cellData.map((trackData) =>
      trackData.map((cell) => ({
        ...cell,
        isActive: false,
      })),
    )

    setCellData(updatedCellData)
    console.log(updatedCellData)
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
        <ResetButton onClick={handleReset} />
        <LaserButton toggleLaser={toggleLaser} />
        {/* Passing the toggle function */}
      </div>
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
      {isLaserActive && <Lasers />} {/* Conditionally render based on state */}
    </>
  )
}
