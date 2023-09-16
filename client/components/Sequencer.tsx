import { useState } from 'react'
import * as Tone from 'tone'

import Track from './Track'

export default function Sequencer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const trackNumber = [...Array(4).keys()]
  const stepNumber = 16
  let currentStep = 0

  const drumPart = new Tone.Players({
    0: '/samples/clap.wav',
    1: '/samples/hihat.wav',
    2: '/samples/snare.wav',
    3: '/samples/kick.wav',
  }).toDestination()

  const cellIds: string[][] = getCellIds()

  // 4 beats per bar, 4 bars per loop = 16 beats
  // Quarter note = 1 beat
  // Interval = 60 / BPM
  Tone.Transport.timeSignature = [4, 4]
  // Tone.Transport.bpm.value = 120
  const interval = 60 / Tone.Transport.bpm.value

  // Could be obsolete as tracks and steps are fixed
  function getCellIds() {
    const arr: string[][] = []
    console.log(arr)
    for (let i = 0; i < trackNumber.length; i++) {
      arr.push([])
      for (let j = 0; j < stepNumber; j++) {
        arr[i].push(`cell-${i}-${j}`)
      }
    }
    return arr
  }

  console.log(cellIds)

  // drumPart.player(String(currentStep)).start(time).stop(time + 0.1)

  // Setup main loop
  const mainLoop = new Tone.Loop()
  mainLoop.callback = (time) => {
    // loop through each track
    for (let track = 0; track < trackNumber.length; track++) {
      // loop through each step
      if (
        document
          .getElementById(`cell-${track}-${currentStep}`)
          ?.getAttribute('value') === 'active'
      ) {
        // Play sample
        drumPart
          .player(String(track))
          .sync()
          .start(time)
          .stop(time + 0.1)
      }
    }
    currentStep < stepNumber - 1 ? currentStep++ : (currentStep = 0)

    //vvvvv ADD CODE BELOW vvvvv

    //^^^^^ ADD CODE ABOVE ^^^^^
  }
  // Start this outside of the play/pause function otherwise it will start another loop
  mainLoop.interval = interval
  mainLoop.start()

  function handlePlayPause() {
    // Dispose of previous loop
    mainLoop.dispose()

    // Resume audio context on user interaction otherwise audio will not play
    Tone.context.resume()

    // Set isPlaying state: true | false
    setIsPlaying((prevState) => !prevState)

    // Set transport state: .start() | .stop() | .pause()
    if (isPlaying) {
      Tone.Transport.pause()
      drumPart.stopAll()
    } else {
      Tone.Transport.start('+0.001')
    }
    console.log(`Transport state: ${Tone.Transport.state}`)
  }

  return (
    <>
      <div className="sequencer"></div>
      <button onClick={handlePlayPause}>{isPlaying ? 'PAUSE' : 'PLAY'}</button>
      {trackNumber.map((track) => {
        return <Track key={track} trackNumber={track} steps={stepNumber} />
      })}
    </>
  )
}
