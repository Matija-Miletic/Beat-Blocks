// LaserButton.tsx
import React from 'react'
import { IconButton } from '@chakra-ui/react'
import { GiLaserWarning, GiWhiteBook } from 'react-icons/gi'

interface LaserButtonProps {
  toggleLaser: () => void
}

export const LaserButton: React.FC<LaserButtonProps> = ({ toggleLaser }) => {
  return (
    <IconButton
      variant="outline"
      colorScheme="blue"
      aria-label="Toggle Laser"
      fontSize="20px"
      icon={<GiLaserWarning />}
      onClick={toggleLaser} // Toggle laser effect on click
      backgroundColor={'#fdd835'}
    />
  )
}
