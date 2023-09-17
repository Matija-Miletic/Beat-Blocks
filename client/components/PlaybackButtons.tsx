import { IconButton } from '@chakra-ui/react'
import { MouseEventHandler } from 'react'
import {
  AiFillPlayCircle,
  AiOutlinePause,
  AiOutlineStop,
  AiOutlineSync,
  AiOutlineAudio,
} from 'react-icons/ai' // Importing additional icons

// Play
export const PlayButton = (props: {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined
}) => {
  return (
    <IconButton
      variant="outline"
      colorScheme="teal"
      aria-label="Play Video"
      fontSize="20px"
      icon={<AiFillPlayCircle />}
      onClick={props.onClick}
    />
  )
}

// Pause
export const PauseButton = (props: {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined
}) => {
  return (
    <IconButton
      variant="outline"
      colorScheme="yellow"
      aria-label="Pause Video"
      fontSize="20px"
      icon={<AiOutlinePause />}
      onClick={props.onClick}
    />
  )
}

// Stop
export const StopButton = () => {
  return (
    <IconButton
      variant="outline"
      colorScheme="red"
      aria-label="Stop Video"
      fontSize="20px"
      icon={<AiOutlineStop />}
    />
  )
}

// Loop
export const LoopButton = () => {
  return (
    <IconButton
      variant="outline"
      colorScheme="purple"
      aria-label="Loop Video"
      fontSize="20px"
      icon={<AiOutlineSync />}
    />
  )
}

// Record
export const RecordButton = () => {
  return (
    <IconButton
      variant="outline"
      colorScheme="pink"
      aria-label="Record Video"
      fontSize="20px"
      icon={<AiOutlineAudio />}
    />
  )
}
