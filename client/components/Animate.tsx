import React, { useEffect, useRef, useMemo } from 'react'
import { useSpring, animated } from '@react-spring/web'
import * as Tone from 'tone'

const Animator = () => {
  const { x } = useSpring({
    from: { x: 0 },
    to: { x: 100 },
    config: { duration: 1000 },
    onFrame: (props: { x: number }) => {
      // Map animation value to a parameter in Tone.js
      if (oscillator.current) {
        const frequency = Tone.Frequency(props.x * 2 + 440) as unknown as number
        oscillator.current.frequency.setValueAtTime(
          frequency,
          audioContext.currentTime,
        )
      }
    },
  })

  const audioContext = useMemo(() => {
    return new (window.AudioContext || window.webkitAudioContext)() // Create an audio context
  }, [])

  const oscillator = useRef<Tone.Oscillator | null>(null) // Use a ref for oscillator

  useEffect(() => {
    oscillator.current = new Tone.Oscillator({
      frequency: 440, // Set your desired frequency
    }).toDestination()

    // Start the oscillator
    if (oscillator.current) {
      oscillator.current.start()
      oscillator.current.stop('+1') // Stop after 1 second
    }

    return () => {
      if (oscillator.current) {
        oscillator.current.dispose()
      }
    }
  }, [])

  return (
    <animated.div
      style={{
        width: '100px',
        height: '100px',
        backgroundColor: 'blue',
        transform: x.interpolate((val) => `translateX(${val}px)`),
      }}
    ></animated.div>
  )
}

export default Animator
