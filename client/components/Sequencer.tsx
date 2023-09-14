import { useState } from 'react'
import * as Tone from 'tone'
import Track from './Track'

export default function Sequencer() {
  const trackNumber = [...Array(4).keys()]
  const stepNumber = 16
  const [isPlaying, setIsPlaying] = useState(false)

  const clap = new Tone.Player('/samples/clap.wav').toDestination()
  Tone.Transport.bpm.value = 60

  function handleClick() {
    isPlaying ? Tone.Transport.stop() : Tone.Transport.start()
    setIsPlaying(!isPlaying)
    clap.start()
  }

  return (
    <>
      <div className="sequencer"></div>
      <button onClick={handleClick}>{isPlaying ? 'STOP' : 'PLAY'}</button>
      {trackNumber.map((track) => {
        return <Track key={track} trackNumber={track} steps={stepNumber} />
      })}
    </>
  )
}
