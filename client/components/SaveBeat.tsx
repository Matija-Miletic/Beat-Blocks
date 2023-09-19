import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  Box,
  flexbox,
} from '@chakra-ui/react'
import { AiOutlineSave } from 'react-icons/ai'
import { CellState } from '../../models/beats'
import { useState } from 'react'
import { saveBeat } from '../apis/beats'
import { useQueryClient } from '@tanstack/react-query'

interface SaveBeatProps {
  cellStates: CellState[] // Define the prop type
}
export default function SaveBeat({ cellStates }: SaveBeatProps) {
  const [nameInputVis, setNameInputVis] = useState(false)
  const [input, setInput] = useState('')
  const handleSaveClick = () => {
    setNameInputVis(true)
  }

  const handleCancel = () => {
    setNameInputVis(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }
  const queryClient = useQueryClient()

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault()

    if (input === '') {
      // Display an error message to the user

      return
    }

    const newBeat = { name: input, cell_states: JSON.stringify(cellStates) }
    saveBeat(newBeat)
    queryClient.invalidateQueries(['beats'])
    setNameInputVis(false)
  }

  return (
    <>
      <IconButton
        onClick={handleSaveClick}
        variant="outline"
        colorScheme="pink"
        aria-label="Save beat"
        fontSize="20px"
        icon={<AiOutlineSave />}
        backgroundColor={'#fdd835'}
      />
      {nameInputVis && (
        <form onSubmit={handleSubmit}>
          <InputGroup size="md">
            <Input
              type="string"
              pr="4.5rem"
              placeholder="Enter beat name"
              value={input}
              onChange={handleInputChange}
            />
            <InputRightElement width="11rem">
              <Box display="flex">
                <Button type="submit" h="1.75rem" size="sm" width="4.5rem">
                  Submit
                </Button>

                <Button
                  h="1.75rem"
                  size="sm"
                  width="4.5rem"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Box>
            </InputRightElement>
          </InputGroup>
        </form>
      )}
    </>
  )
}
