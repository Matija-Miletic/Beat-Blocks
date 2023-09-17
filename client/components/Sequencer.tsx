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
    // add in a track to connect tracker animation to
    4: '/samples/hihat.wav',
  }).toDestination()

  console.log(drumPart)

  const mainLoop = new Tone.Loop()
  mainLoop.callback = (time) => {
    for (let track = 0; track < trackNumber.length; track++) {
      //Check cell of each track for current step then play drum part if active
      const cell = document.getElementById(`cell-${track}-${currentStep}`)
      if (cell?.getAttribute('value') === 'active' && track !== 4) {
        drumPart
          .player(String(track))
          .sync()
          .start(time)
          .stop(time + 0.1)

        Tone.Draw.schedule(function () {
          //this callback is invoked from a requestAnimationFrame
          //and will be invoked close to AudioContext time
          cell.classList.add('animate')
          setTimeout(() => {
            cell.classList.remove('animate')
          }, 99)
        }, time)
      } else if (track === 4) {
        // drumPart
        //   .player(String(track))
        //   .sync()
        //   .start(time)
        //   .stop(time + 0.1)

        Tone.Draw.schedule(function () {
          //this callback is invoked from a requestAnimationFrame
          //and will be invoked close to AudioContext time
          cell.classList.add('animate')
          setTimeout(() => {
            cell.classList.remove('animate')
          }, 99)
        }, time)
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
