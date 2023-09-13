import React from 'react'
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  Text,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

const TempoSlider = ({ onChange }) => {
  const [tempo, setTempo] = React.useState(40) // default tempo
  const minTempo = 40
  const maxTempo = 240
  const stepTempo = 10

  const handleChange = (value) => {
    setTempo(value)
    if (onChange) {
      onChange(value)
    }
  }

  return (
    <Flex alignItems="center">
      <Text mb={2} mr={4}>
        Tempo: {minTempo} - {maxTempo} BPM
      </Text>
      <NumberInput
        maxW="100px"
        value={tempo}
        onChange={(valueStr, valueNum) => handleChange(valueNum)}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Slider
        ml={4}
        flex="1"
        defaultValue={minTempo}
        min={minTempo}
        max={maxTempo}
        step={stepTempo}
        value={tempo}
        onChange={handleChange}
      >
        <SliderTrack bg="red.100">
          <Box position="relative" right={10} />
          <SliderFilledTrack bg="tomato" />
        </SliderTrack>
        <SliderThumb boxSize={6} />
      </Slider>
    </Flex>
  )
}

export default TempoSlider
