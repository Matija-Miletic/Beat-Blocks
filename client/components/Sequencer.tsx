import { useState } from 'react'
import * as Tone from 'tone'

import Track from './Track'

interface Tempo {
  tempo: number
}

export default function Sequencer({ tempo }: Tempo) {
  const [isPlaying, setIsPlaying] = useState(false)
  const trackNumber = [...Array(1).keys()]
  const stepNumber = 16
  const cellIds: string[] = []

  const kick = new Tone.Player('/samples/kick.wav').toDestination()
  const snare = new Tone.Player('/samples/snare.wav').toDestination()
  const hihat = new Tone.Player('/samples/hihat.wav').toDestination()
  const clap = new Tone.Player('/samples/clap.wav').toDestination()

  let currentStep = 0

  // 4 beats per bar, 4 bars per loop = 16 beats
  // Quarter note = 1 beat
  // Interval = 60 / BPM

  function getCellIds() {
    for (let i = 0; i < trackNumber.length; i++) {
      for (let j = 0; j < stepNumber; j++) {
        cellIds.push(`cell-${i}-${j}`)
      }
    }
  }
  console.log(`this is the tempo ${tempo}`)
  async function handlePlayPause() {
    // Sets Audio Context from suspended state to running state
    Tone.getContext().resume()

    // Get bpm from slider/number input
    // const tempo = document.getElementById('tempo') as HTMLInputElement

    // Set BPM
    // Tone.Transport.bpm.value = Number(tempo.getAttribute('value'))
    Tone.Transport.bpm.value = tempo

    getCellIds()

    const interval = 60 / Tone.Transport.bpm.value
    console.log(`Interval: ${interval} seconds`)

    // Schedule a repeated sequence and iterate through each track then cell and play the corresponding sound if active
    Tone.Transport.scheduleRepeat((time) => {
      // console.log(`Quarter note at ${time}`)

      /////// CODE GOES HERE
      //  REMOVE THIS COMMENT
      ///////

      // Get the current cell for this iteration and check if it is active
      const cellElement = document.getElementById(cellIds[currentStep])
      if (cellElement?.getAttribute('value') === 'active') {
        // console.log(cellElement)

        /////// IF DEPENDANT ON ACTIVE CELL, CODE GOES HERE
        // REMOVE THIS COMMENT
        ///////

        // Get sound then play the corresponding sound
        const soundSelectElement = document.getElementById('soundselection-0')

        // const sound = soundSelectElement?.getAttribute('value')
        const soundCollection = soundSelectElement?.getAttributeNames()
        console.log(soundCollection)

        kick.start(time).stop(time + 0.1)

        // if (sound === '1') clap.start(time).stop(time + 0.1)
        // if (sound === '2') hihat.start(time).stop(time + 0.1)
        // if (sound === '3') snare.start(time).stop(time + 0.1)
        // if (sound === '4') kick.start(time).stop(time + 0.1)
        // Sample is not disposed or stopped properly, causing the previous sample to play on top of the same sample at the next interval
      }
      currentStep > 15 ? (currentStep = 0) : currentStep++
    }, interval)

    // transport must be started before it starts invoking events
    isPlaying ? Tone.Transport.stop() : Tone.Transport.start()
    setIsPlaying((prevState) => !prevState)
  }

  return (
    <>
      <div className="sequencer"></div>
      <button onClick={handlePlayPause}>{isPlaying ? 'STOP' : 'PLAY'}</button>
      {trackNumber.map((track) => {
        return <Track key={track} trackNumber={track} steps={stepNumber} />
      })}
    </>
  )
}

// State:
