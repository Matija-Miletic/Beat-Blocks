import { useEffect, useState } from 'react'
import * as Tone from 'tone'

import Track from './Track'
import * as Buttons from './PlaybackButtons'
import { ResetButton } from './ResetButton'
import { LaserButton } from './LaserButton'
import { Lasers } from './Lasers'
import TempoSlider from './TempoSlider'
import BeatSelect from './BeatSelect'
import SaveBeat from './SaveBeat'
import { getBeatByName } from '../apis/beats'
import { CellState, SelectedBeat } from '../../models/beats'
import { Box, Center } from '@chakra-ui/react'

const TRACK_COUNT = 7
const STEP_COUNT = 16

let currentStep = 0
const trackNumber = [...Array(TRACK_COUNT).keys()]

const drumPart = new Tone.Players({
  1: '/samples/808.wav',
  2: '/samples/clap-alt.wav',
  3: '/samples/percussion-alt.wav',
  4: '/samples/hihat-alt.wav',
  5: '/samples/snare-alt.wav',
  6: '/samples/kick-alt.wav',
}).toDestination()

const mainLoop = new Tone.Loop()

export default function Sequencer() {
  const [isPlaying, setIsPlaying] = useState(false)
  // const trackNumber = [...Array(TRACK_COUNT).keys()]

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

  const handleMenuSelectionChange = async (selection: string) => {
    const presetBeatArray = await getBeatByName(selection) //gets data from db
    const presetBeat = {
      ...presetBeatArray[0],
      cell_states: JSON.parse(presetBeatArray[0].cell_states),
    }
    setSelectedBeat(presetBeat)

    console.log('Presetbeat at client', presetBeat)
  }
  ///////////////// SEQUENCER CODE ////////////////////////////

  // let currentStep = 0

  Tone.Transport.bpm.value = tempo

  useEffect(() => {
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
      }
      currentStep < STEP_COUNT - 1 ? currentStep++ : (currentStep = 0)
    }

    // Start this outside of the play/pause function otherwise it will start another loop

    mainLoop.interval = '16n'

    mainLoop.start()
  })

  // startTransportHandler = () => {
  //   Transport.start("+.2");
  //   this.setState({
  //     start: true
  //   });
  // };
  // stopTransportHandler = () => {
  //   Transport.stop();
  //   Transport.clear();
  //   this.setState({
  //     start: false
  //   });
  // };

  function handlePlay() {
    // Dispose of previous loop to prevent multiple loops from running
    mainLoop.start()
    // Resume audio context on user interaction otherwise audio will not play
    Tone.context.resume()
    setIsPlaying(true)
    Tone.Transport.start('+0.1')
  }

  function handlePause() {
    // Dispose of previous loop to prevent multiple loops from running
    // mainLoop.dispose()
    mainLoop.stop()
    // Resume audio context on user interaction otherwise audio will not play
    // Tone.context.resume()
    setIsPlaying(false)
    drumPart.stopAll()
    Tone.Transport.stop()
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
    mainLoop.dispose()
    currentStep = 0
    setTimeout(() => {
      setReset(false)
    }, 100)
  }

  const [invalidate, setInvalidate] = useState(false)
  const invalidateBeats = () => {
    setInvalidate(true)
    setTimeout(() => {
      setInvalidate(false)
    })
  }

  return (
    <>
      <Center>
        <div className="button-container">
          {isPlaying ? (
            <Buttons.PauseButton onClick={handlePause} />
          ) : (
            <Buttons.PlayButton onClick={handlePlay} />
          )}
          <Buttons.RecordButton />
          <ResetButton onClick={handleReset} />
          <LaserButton toggleLaser={toggleLaser} />
          <SaveBeat cellStates={cellStates} invalidateBeats={invalidateBeats} />
          <BeatSelect
            onMenuSelectionChange={handleMenuSelectionChange}
            invalidate={invalidate}
          />
          {/* Passing the toggle function */}
        </div>
      </Center>
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
        <Box w="90%" className="slider-container no-interaction">
          <TempoSlider onChange={handleTempoChange} />
        </Box>
      ) : (
        <Box w="90%" className="slider-container">
          <TempoSlider onChange={handleTempoChange} />
        </Box>
      )}
      {isLaserActive && <Lasers />} {/* Conditionally render based on state */}
    </>
  )
}
