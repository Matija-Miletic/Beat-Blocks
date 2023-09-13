import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { AiFillPlayCircle, AiOutlinePause, AiOutlineStop, AiOutlineSync, AiOutlineAudio } from 'react-icons/ai'; // Importing additional icons

// Play Button
export const PlayButton = () => {
  return (
    <IconButton
      variant="outline"
      colorScheme="teal"
      aria-label="Play Video"
      fontSize="20px"
      icon={<AiFillPlayCircle />}
    />
  );
};

// Pause Button
export const PauseButton = () => {
  return (
    <IconButton
      variant="outline"
      colorScheme="yellow"
      aria-label="Pause Video"
      fontSize="20px"
      icon={<AiOutlinePause />}
    />
  );
};

// Stop Button
export const StopButton = () => {
  return (
    <IconButton
      variant="outline"
      colorScheme="red"
      aria-label="Stop Video"
      fontSize="20px"
      icon={<AiOutlineStop />}
    />
  );
};

// Loop Button
export const LoopButton = () => {
  return (
    <IconButton
      variant="outline"
      colorScheme="purple"
      aria-label="Loop Video"
      fontSize="20px"
      icon={<AiOutlineSync />}
    />
  );
};

// Record Button
export const RecordButton = () => {
  return (
    <IconButton
      variant="outline"
      colorScheme="pink"
      aria-label="Record Video"
      fontSize="20px"
      icon={<AiOutlineAudio />}
    />
  );
};
