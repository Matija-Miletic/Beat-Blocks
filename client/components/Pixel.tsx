import { useState } from 'react'

import * as lib from '../../lib/lib.ts'

export default function Pixel(props: { id: number }) {
  const PIXEL_SIZE = 50

  const [color, setColor] = useState(lib.getRandomColor())

  return (
    <div
      className="pixel"
      id={`pixel-${props.id}`}
      style={{
        height: PIXEL_SIZE,
        width: PIXEL_SIZE,
        backgroundColor: color,
      }}
    ></div>
  )
}
