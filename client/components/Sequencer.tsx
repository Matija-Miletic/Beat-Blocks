import { useState } from 'react'
import * as Tone from 'tone'

import Track from './Track'

const TRACK_COUNT = 4
const STEP_COUNT = 16

export default function Sequencer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const trackNumber = [...Array(TRACK_COUNT).keys()]

  let currentStep = 0

  const drumPart = new Tone.Players({
    0: '/samples/clap.wav',
    1: '/samples/hihat.wav',
    2: '/samples/snare.wav',
    3: '/samples/kick.wav',
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
        drumPart
          .player(String(track))
          .sync()
          .start(time)
          .stop(time + 0.1)
      }
    }
    currentStep < STEP_COUNT - 1 ? currentStep++ : (currentStep = 0)

    //vvvvv ADD CODE BELOW vvvvv

    //^^^^^ ADD CODE ABOVE ^^^^^
  }
  // Start this outside of the play/pause function otherwise it will start another loop
  mainLoop.interval = '8n'
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

  return (
    <>
      <div className="sequencer"></div>
      <button onClick={handlePlayPause}>{isPlaying ? 'PAUSE' : 'PLAY'}</button>
      {trackNumber.map((track) => {
        return <Track key={track} trackNumber={track} steps={STEP_COUNT} />
      })}
    </>
  )
}
