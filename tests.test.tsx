import { render, fireEvent } from '@testing-library/react'
import Sequencer from './client/components/Sequencer'
import { test } from 'vitest'

// 1. Test that the component renders without crashing
test('Sequencer renders without crashing', () => {
  render(<Sequencer />)
})

// 2. Test that the play button renders and can be clicked
test('Play button renders and can be clicked', () => {
  const { getByText } = render(<Sequencer />)
  const playButton = getByText('PLAY')
  fireEvent.click(playButton)
})

// 3. Test that the pause button renders and can be clicked
test('Pause button renders and can be clicked', () => {
  const { getByText } = render(<Sequencer />)
  const pauseButton = getByText('PAUSE')
  fireEvent.click(pauseButton)
})

// 4. Test that the reset button renders and can be clicked
test('Reset button renders and can be clicked', () => {
  const { getByText } = render(<Sequencer />)
  const resetButton = getByText('RESET')
  fireEvent.click(resetButton)
})

// 5. Test that the laser button renders and can be clicked
test('Laser button renders and can be clicked', () => {
  const { getByText } = render(<Sequencer />)
  const laserButton = getByText('LASER')
  fireEvent.click(laserButton)
})

// 6. Test that the tempo slider renders and can be interacted with
test('Tempo slider renders and can be interacted with', () => {
  const { getByLabelText } = render(<Sequencer />)
  const tempoSlider = getByLabelText('Tempo')
  fireEvent.change(tempoSlider, { target: { value: 120 } })
})

// 7. Test that the beat select menu renders and can be interacted with
test('Beat select menu renders and can be interacted with', () => {
  const { getByText, getByRole } = render(<Sequencer />)
  const beatSelectButton = getByText('Select Beat')
  fireEvent.click(beatSelectButton)
  const menu = getByRole('listbox')
  fireEvent.click(menu)
})

// 8. Test that a track renders without crashing
test('Track component renders without crashing', () => {
  const { getByTestId } = render(<Sequencer />)
  const track = getByTestId('track-0') // Adjust the track number as needed
})

// 9. Test that a cell within a track can be clicked
test('Cell within a track can be clicked', () => {
  const { getByTestId } = render(<Sequencer />)
  const cell = getByTestId('cell-0-0') // Adjust the track and cell index as needed
  fireEvent.click(cell)
})

// 10. Test that the Save Beat component renders without crashing
test('Save Beat component renders without crashing', () => {
  const { getByText } = render(<Sequencer />)
  const saveBeatButton = getByText('SAVE BEAT')
  fireEvent.click(saveBeatButton)
})
