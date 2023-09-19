import { useRef, useState } from 'react'
import * as Tone from 'tone'

import * as Buttons from './PlaybackButtons'
import { ResetButton } from './ResetButton'
import { LaserButton } from './LaserButton'
import Track from './Track'
import lighting from '../lighting'
import TempoSlider from './TempoSlider'
import { Lasers } from './Lasers'
import BeatSelect from './BeatSelect'
import { getBeatByName } from '../apis/beats'
import { CellState, SelectedBeat } from '../../models/beats'
import SaveBeat from './SaveBeat'

const TRACK_COUNT = 7
const STEP_COUNT = 32

export default function Sequencer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const trackNumber = [...Array(TRACK_COUNT).keys()]

  // Sets tempo state used to determine speed of sequencer and animation timeout
  const [tempo, setTempo] = useState(100)

  // Sets state for showing flashing colours
  // const [lights, setLights] = useState(false)

  const [isLaserActive, setIsLaserActive] = useState(false) // New state variable

  const [reset, setReset] = useState(false)

  const [selectedBeat, setSelectedBeat] = useState<null | SelectedBeat>(null)

  // All cell isActive states so we can save
  const [cellStates, setCellStates] = useState<CellState[]>([])

  const handleCellStateChange = (cellId: string, isActive: boolean) => {
    // Find the index of the cell in the cellStates array
    const cellIndex = cellStates.findIndex((cell) => cell.id === cellId)
    setSelectedBeat(null)
    if (cellIndex !== -1) {
      // If the cell exists in the array, update its isActive property
      const updatedCellStates = [...cellStates]
      updatedCellStates[cellIndex] = { ...cellStates[cellIndex], isActive }
      setCellStates(updatedCellStates)
    } else {
      // If the cell doesn't exist in the array, create a new object
      const newCell = { id: cellId, isActive }
      setCellStates((prevCellStates) => [...prevCellStates, newCell])
    }
  }
  // console.log('cellStates:', cellStates)

  const handleMenuSelectionChange = async (selection: string) => {
    const presetBeatArray = await getBeatByName(selection) //gets data from db
    const presetBeat = {
      ...presetBeatArray[0],
      cell_states: JSON.parse(presetBeatArray[0].cell_states),
    }
    setSelectedBeat(presetBeat)
    // const cellStateArr = JSON.parse(presetBeat.cell_states)
    console.log('Presetbeat at client', presetBeat)
  }

  let currentStep = 0
  // TODO: Get BPM from tempo slider component

  Tone.Transport.bpm.value = tempo

  // TODO: add more drum samples => clap, hihat-closed, hihat-open, snare, kick, 808, percussion, melody

  const drumPart = new Tone.Players({
    0: '/samples/kick-alt.wav',
    1: '/samples/808.wav',
    2: '/samples/clap-alt.wav',
    3: '/samples/percussion-alt.wav',
    4: '/samples/hihat-alt.wav',
    5: '/samples/snare-alt.wav',
  }).toDestination()

  const mainLoop = new Tone.Loop()
  mainLoop.callback = (time) => {
    for (let track = 0; track < trackNumber.length; track++) {
      //Check cell of each track for current step then play drum part if active
      const cell = document.getElementById(`cell-${track}-${currentStep}`)
      if (track === 0 && cell) {
        Tone.Draw.schedule(function () {
          //this callback is invoked from a requestAnimationFrame
          //and will be invoked close to AudioContext time

          cell.classList.replace('light-down', 'light-up')
          setTimeout(() => {
            cell.classList.replace('light-up', 'light-down')
          }, 99)
        }, time)
      } else if (cell?.getAttribute('value') === 'active') {
        {
          drumPart.player(String(track)).sync().start(time).stop()

          Tone.Draw.schedule(function () {
            //this callback is invoked from a requestAnimationFrame
            //and will be invoked close to AudioContext time

            // if (lights) lighting()
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

  mainLoop.interval = '16n'

  mainLoop.start()

  function handlePlay() {
    // Dispose of previous loop to prevent multiple loops from running
    mainLoop.dispose()
    // Resume audio context on user interaction otherwise audio will not play
    Tone.context.resume()
    setIsPlaying(true)
    Tone.Transport.start('+0.1')
  }

  function handlePause() {
    // Dispose of previous loop to prevent multiple loops from running
    mainLoop.dispose()
    // Resume audio context on user interaction otherwise audio will not play
    // Tone.context.resume()
    setIsPlaying(false)
    drumPart.stopAll()
    Tone.Transport.pause()
  }

  // Function to toggle laser state
  const toggleLaser = () => {
    setIsLaserActive((prevState) => !prevState)
  }

  // Set BPM to match tempo slider
  const handleTempoChange = (newTempo: number) => {
    console.log(`New Tempo: ${newTempo} BPM`)
    mainLoop.dispose()
    setTempo(newTempo)
  }

  const handleReset = () => {
    console.log('reset has triggered')
    setCellStates([])
    setReset(true)
    setTimeout(() => {
      setReset(false)
    }, 100)
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
        <SaveBeat cellStates={cellStates} />
        <BeatSelect onMenuSelectionChange={handleMenuSelectionChange} />
        {/* Passing the toggle function */}
      </div>
      {trackNumber.map((track) => {
        return (
          <Track
            key={track}
            trackNumber={track}
            steps={STEP_COUNT}
            reset={reset}
            handleCellStateChange={handleCellStateChange}
            cellStates={cellStates}
            selectedBeat={selectedBeat}
          />
        )
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
