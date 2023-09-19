import React, { useEffect } from 'react'
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
  SliderMark,
  Image,
} from '@chakra-ui/react'

interface TempoSliderProps {
  id?: string
  bpm?: number
  onChange?: (value: number) => void
}

const TempoSlider: React.FC<TempoSliderProps> = ({
  id,
  bpm = 100,
  onChange,
}) => {
  const [tempo, setTempo] = React.useState<number>(bpm) // Initialize tempo with bpm prop
  const minTempo = 40
  const maxTempo = 240
  const stepTempo = 10

  useEffect(() => {
    setTempo(bpm)
  }, [bpm])

  const handleChange = (value: number) => {
    setTempo(value)
    if (onChange) {
      onChange(value)
    }
  }
  const sliderMarks = []
  for (let i = minTempo; i <= maxTempo - 10; i += 10) {
    sliderMarks.push(
      <SliderMark key={i} value={i} mt="1" ml="2.5" fontSize="sm">
        |
      </SliderMark>,
    )
  }
  return (
    <Flex alignItems="center">
      <Text mb={2} mr={4}>
        Tempo: {minTempo} - {maxTempo} BPM
      </Text>
      <NumberInput
        id={id ? `${id}-number-input` : undefined}
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
        id={id ? `${id}-slider` : undefined}
        ml={4}
        flex="1"
        defaultValue={minTempo}
        min={minTempo}
        max={maxTempo}
        step={stepTempo}
        value={tempo}
        onChange={handleChange}
        position="relative"
        minW="50px"
      >
        <SliderTrack bg="red.100">
          <Box position="relative" right={10} />

          <SliderFilledTrack bg="tomato" />
        </SliderTrack>
        <SliderThumb boxSize={8}>
          <Box className="brick 1x1" />
        </SliderThumb>
        {sliderMarks}
      </Slider>
    </Flex>
  )
}

export default TempoSlider
