// VisualTrack.js
import React from 'react'

interface VisualTrackProps {
  steps: number
  currentStep: number
}

const VisualTrack: React.FC<VisualTrackProps> = ({ steps, currentStep }) => {
  return (
    <div className="visual-track">
      {Array.from({ length: steps }).map((_, index) => (
        <div
          key={index}
          className={`cell ${index === currentStep ? 'active' : ''}`}
        >
          prog
        </div>
      ))}
    </div>
  )
}

export default VisualTrack
