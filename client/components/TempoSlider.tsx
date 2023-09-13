import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  Text,
} from '@chakra-ui/react'

const TempoSlider = ({ onChange }) => {
  const minTempo = 40
  const maxTempo = 240
  const stepTempo = 10

  const handleChange = (value) => {
    if (onChange) {
      onChange(value)
    }
  }

  return (
    <div>
      <Text mb={2}>
        Tempo: {minTempo} - {maxTempo} BPM
      </Text>
      <Slider
        defaultValue={minTempo}
        min={minTempo}
        max={maxTempo}
        step={stepTempo}
        onChange={handleChange}
      >
        <SliderTrack bg="red.100">
          <Box position="relative" right={10} />
          <SliderFilledTrack bg="tomato" />
        </SliderTrack>
        <SliderThumb boxSize={6} />
      </Slider>
    </div>
  )
}

export default TempoSlider
