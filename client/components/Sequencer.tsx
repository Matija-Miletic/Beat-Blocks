import { useState } from 'react'
import * as Tone from 'tone'

import Track from './Track'

const TRACK_COUNT = 5
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
    4: '/samples/shout.wav',
  }).toDestination()

  console.log(drumPart)

  const mainLoop = new Tone.Loop()
  mainLoop.callback = (time) => {
    for (let track = 0; track < trackNumber.length; track++) {
      //Check cell of each track for current step then play drum part if active
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
      //   if (
      //     document
      //       .getElementById(`cell-${track}-${currentStep}`)
      //       ?.getAttribute('value') === 'active' &&
      //     drumPart.index !== 4
      //   ) {
      //     drumPart
      //       .player(String(track))
      //       .sync()
      //       .start(time)
      //       .stop(time + 0.1)
      //   } else {
      //     drumPart
      //       .player(String(track))
      //       .sync()
      //       .start(time)
      //       .stop(time + 0.5)
      //   }
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
      const beatsPerLoop = STEP_COUNT / 8 // Assuming one step is 8n
      const tempo = Tone.Transport.bpm.value // Get the tempo in beats per minute
      const loopDurationSeconds = (beatsPerLoop / tempo) * 60
      console.log('tempo (bpm):', tempo)
      console.log('Loop duration (seconds):', loopDurationSeconds)
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
